import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MY_API_URL } from './Wallet';

export default class SignUp extends Component {
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

  onClickSignUp = () => {
    const { email, password } = this.state;
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

    fetch(`${MY_API_URL}/user`, configs)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Este email ja está cadastrado') {
          return toast.error('Este email ja está cadastrado!');
        }
        toast.success('Email cadastrado');
        const { history } = this.props;
        history.push('/');
      });
  };

  render() {
    const { isBtnDisabled, email, password } = this.state;
    const { history } = this.props;
    return (
      <div className="loginPage">
        <div className="loginPage--logo" />
        <div className="main--login-page">
          <div className="loginPage--signup--logo" />
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
              value={ password }
            />
            <p>Senha</p>
            <span />
          </div>
          <button
            className="loginPage--Btn"
            disabled={ isBtnDisabled }
            onClick={ this.onClickSignUp }
          >
            Registrar-se

          </button>
          <button
            className="loginPage--Btn"
            onClick={ () => history.push('/signin') }
          >
            Já tenho conta
          </button>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
