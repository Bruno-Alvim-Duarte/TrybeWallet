/* eslint-disable react-func/max-lines-per-function */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';
import { editExpense, saveExpensesFromDB } from '../redux/actions';
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

  getExchangeRateNumberAndName = async (currencyWanted) => {
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => data);
    delete exchangeRates.USDT;

    const exchangeRateCurrencyWanted = exchangeRates[currencyWanted];
    const exchangeRate = Number(exchangeRateCurrencyWanted.ask);
    const currencyName = exchangeRateCurrencyWanted.name;
    return {
      exchangeRate,
      currencyName,
    };
  };

  addOrEditExpenseBtn = async () => {
    const { editor, idToEdit, dispatch } = this.props;

    const { value, description, currency, method, tag } = this.state;
    const { exchangeRate,
      currencyName } = await this.getExchangeRateNumberAndName(currency);
    const token = Cookies.get('token');

    const configs = {
      method: editor ? 'PUT' : 'POST',
      body: JSON.stringify({
        value,
        description,
        currency,
        method,
        tag,
        exchangeRate,
        currencyName,
      }),
      headers: {
        ...headers,
        Authorization: token,
      },
    };

    await fetch(`${MY_API_URL}/carteira/${editor ? idToEdit : ''}`, configs)
      .then((response) => response.json())
      .then((data) => console.log(data));
    this.getExpensesFromDB();
    this.setState({ ...this.INITIAL_STATE });

    if (editor) {
      dispatch(editExpense());
    }
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
            addOrEditExpenseBtn={ this.addOrEditExpenseBtn }
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
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  email: state.user.email,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
