import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCoins } from '../redux/actions';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchCoins());
  }

  render() {
    const { currencies, editor, addExpense, editExpenseBtn,
      value, description, currency, method, tag, handleChange } = this.props;
    return (
      <div className="wallet-form">
        <div className="wallet-form--up">
          <label htmlFor="value">
            Valor
            <input
              name="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ handleChange }
              min="0"
            />
          </label>

          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ handleChange }
            >
              {currencies.map((eachCurrency) => (
                <option
                  value={ eachCurrency }
                  key={ eachCurrency }
                >
                  {eachCurrency}

                </option>
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
              onChange={ handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div className="wallet-form--down">
          <label htmlFor="description">
            Descrição
            <input
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ handleChange }
            />
          </label>

          <label htmlFor="tag">
            Tag
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <button
          onClick={ editor ? editExpenseBtn : addExpense }
        >
          { editor ? 'Editar despesa' : 'Adicionar Despesa'}

        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool,
  editExpenseBtn: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

WalletForm.defaultProps = {
  editor: false,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
