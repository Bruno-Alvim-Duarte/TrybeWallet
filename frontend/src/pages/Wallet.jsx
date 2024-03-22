/* eslint-disable react-func/max-lines-per-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { saveExpensesFromDB } from '../redux/actions';
import '../styles/Wallet.css';

export const MY_API_URL = 'http://localhost:3001';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  mode: 'no-cors',
};

class Wallet extends Component {
  INITIAL_STATE = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: {},
  };

  state = {
    ...this.INITIAL_STATE,
  };

  componentDidMount() {
    this.getExpensesFromDB();
  }

  getExpensesFromDB = () => {
    const { dispatch } = this.props;
    const token = Cookies.get('token');
    fetch('http://localhost:3001/carteira/searchExpenses', {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(saveExpensesFromDB(data));
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpense = async () => {
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => data);
    delete exchangeRates.USDT;

    const { value, description, currency, method, tag } = this.state;
    const token = Cookies.get('token');
    const exchangeRateCurrencyWanted = Object.entries(exchangeRates)
      .find((curr) => curr[1].code === currency)[1];
    const exchangeRateNumber = Number(exchangeRateCurrencyWanted.ask);
    const currencyName = exchangeRateCurrencyWanted.name;
    const configs = {
      method: 'POST',
      body: JSON.stringify({
        value,
        description,
        currency,
        method,
        tag,
        exchangeRate: exchangeRateNumber,
        currencyName,
      }),
      headers: {
        ...headers,
        Authorization: token,
      },
    };
    await fetch(`${MY_API_URL}/carteira`, configs)
      .then((response) => response.json())
      .then((data) => console.log(data));
    this.getExpensesFromDB();
  };

  editExpenseBtn = async () => {
    const { idToEdit } = this.props;
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => data);
    delete exchangeRates.USDT;

    const { value, description, currency, method, tag } = this.state;
    const token = Cookies.get('token');
    const exchangeRateCurrencyWanted = Object.entries(exchangeRates)
      .find((curr) => curr[1].code === currency)[1];
    const exchangeRateNumber = Number(exchangeRateCurrencyWanted.ask);
    const currencyName = exchangeRateCurrencyWanted.name;
    const configs = {
      method: 'PUT',
      body: JSON.stringify({
        value,
        description,
        currency,
        method,
        tag,
        exchangeRate: exchangeRateNumber,
        currencyName,
      }),
      headers: {
        ...headers,
        Authorization: token,
      },
    };
    await fetch(`${MY_API_URL}/carteira/${idToEdit}`, configs)
      .then((response) => response.json())
      .then((data) => console.log(data));
    this.getExpensesFromDB();
    this.setState({ ...this.INITIAL_STATE });

    // const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
    //   .then((response) => response.json())
    //   .then((data) => data);
    // delete exchangeRates.USDT;

    // const dispatching = () => {
    //   dispatch(editExpenseRequest({ editor: false, id: 0 }));
    //   dispatch(editExpense(this.state));
    //   this.setState({ ...this.INITIAL_STATE });
    // };
    // this.setState({ id: idToEdit, exchangeRates }, dispatching);
  };

  editingExpenseChangeInputValues = (expense) => {
    this.setState(expense);
  };

  render() {
    return (
      <div className="wallet">
        <div className="wallet--main">
          <Header />
          <WalletForm
            handleChange={ this.handleChange }
            addExpense={ this.addExpense }
            editExpenseBtn={ this.editExpenseBtn }
            { ...this.state }
          />
        </div>
        <Table
          editingExpenseChangeInputValues={ this.editingExpenseChangeInputValues }
          getExpensesFromDB={ this.getExpensesFromDB }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  idToEdit: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
