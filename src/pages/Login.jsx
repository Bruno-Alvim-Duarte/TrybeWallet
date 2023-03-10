import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';
import '../styles/Login.css';

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
    const { email } = this.state;
    dispatch(saveEmail(email));
    localStorage.setItem('email', email);

    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div className="loginPage">
        <div className="main--login-page">
          <div className="loginPage--logo" />

          <div className="loginPage--txt_field">
            <input
              type="text"
              name="email"
              data-testid="email-input"
              spellCheck="false"
              required
              className="loginPage--inputs"
              onChange={ this.handleChange }
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
        </div>
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
