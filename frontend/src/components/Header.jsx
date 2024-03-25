import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';
import logoTrybeWallet from '../imgs/logoTrybeWallet.svg';
import coins from '../imgs/Coins.svg';
import perfilLogo from '../imgs/perfilLogo.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const Total = expenses.length !== 0 ? expenses
      .reduce((acc, curr) => acc + Number(curr.value) * Number(curr.exchangeRate), 0)
      .toFixed(2) : '0.00';

    return (
      <div className="header">
        <img src={ logoTrybeWallet } alt="logo trybewallet" />
        <p className="header--ammount-field">
          <img src={ coins } alt="" />
          <span>Despesa Total:</span>
          {' '}
          <div className="flex">
            <span data-testid="total-field" className="header--ammount-value">
              { Total }

            </span>
            {' '}
            <span
              data-testid="header-currency-field"
              className="header--ammount-value"
            >
              BRL
            </span>
          </div>
        </p>
        <p data-testid="email-field" className="header--email-field">
          <img src={ perfilLogo } alt="" />
          {' '}
          <span>{ email || localStorage.getItem('email') }</span>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
