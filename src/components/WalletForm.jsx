import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins, saveExpense } from '../redux/actions';

class WalletForm extends Component {
  INITAL_STATE = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'money',
    tag: 'food',
    id: 0,
    exchangeRates: {} };

  state = {
    ...this.INITAL_STATE,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCoins());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpense = async () => {
    const { dispatch } = this.props;
    const exchangeRates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => data);
    delete exchangeRates.USDT;

    const dispatching = async () => {
      await dispatch(saveExpense(this.state));
      this.setState(this.INITAL_STATE);
    };

    const { expenses } = this.props;
    this.setState({ id: expenses.length, exchangeRates }, dispatching);
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <input
          name="value"
          type="number"
          data-testid="value-input"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          name="description"
          type="text"
          data-testid="description-input"
          value={ description }
          onChange={ this.handleChange }
        />
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((eachCurrency) => (
              <option value={ eachCurrency } key={ eachCurrency }>{eachCurrency}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button onClick={ this.addExpense }>Adicionar despesa</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

export default connect(mapStateToProps)(WalletForm);
