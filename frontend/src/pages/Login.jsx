import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { saveEmail } from '../redux/actions';
import '../styles/Login.css';
import { MY_API_URL } from './Wallet';

class Login extends React.Component {
  state = {
    isBtnDisabled: true,
    email: '',
    password: '',
  };

  validation = () => {
    const { email, password } = this.state;
    const minimumLenghtPassword = 6;
    const emailTest = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const passwordTest = password.length >= minimumLenghtPassword;
    this.setState({ isBtnDisabled: !(emailTest && passwordTest) });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, this.validation);
  };

  onClickLogin = () => {
    const { history, dispatch } = this.props;
    const { email, password } = this.state;
    dispatch(saveEmail(email));
    // localStorage.setItem('email', email);
    const configs = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        mode: 'no-cors',
      },
    };

    fetch(`${MY_API_URL}/user/signin?email=${email}`, configs)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Login feito com sucesso') {
          Cookies.set('token', data.token);
          history.push('/carteira');
        }

        if (data.message === 'Erro: Email ou senha incorreta!') {
          return toast.error('Email ou senha incorretos!');
        }

        return toast.error(data.message);
      });
  };

  render() {
    const { isBtnDisabled, email } = this.state;
    const { history } = this.props;
    return (
      <div className="loginPage">
        <div className="main--login-page">
          <div className="loginPage--logo" />
          <h2 className="loginPage--header">Login</h2>
          <div className="loginPage--txt_field">
            <input
              type="text"
              name="email"
              data-testid="email-input"
              spellCheck="false"
              required
              className="loginPage--inputs"
              onChange={ this.handleChange }
              value={ email }
            />
            <p>Email</p>
            <span />
          </div>
          <div className="loginPage--txt_field">
            <input
              type="password"
              name="password"
              spellCheck="false"
              required
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <p>Senha</p>
            <span />
          </div>
          <button
            className="loginPage--Btn"
            disabled={ isBtnDisabled }
            onClick={ this.onClickLogin }
          >
            Entrar

          </button>
          <button
            className="loginPage--Btn"
            onClick={ () => history.push('/') }
          >
            Criar conta
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
