import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

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

    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div>
        <h1>Login</h1>

        <input
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="password"
          data-testid="password-input"
          onChange={ this.handleChange }
        />
        <button disabled={ isBtnDisabled } onClick={ this.onClickLogin }>Entrar</button>
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
