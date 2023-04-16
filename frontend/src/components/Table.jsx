import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editExpenseRequest } from '../redux/actions';
import '../styles/Table.css';
import editBtnLogo from '../imgs/editBtnLogo.svg';
import trashBtnLogo from '../imgs/trashBtnLogo.svg';

class Table extends Component {
  render() {
    const { expenses, dispatch, editingExpenseChangeInputValues } = this.props;
    return (
      <div className="table-comp">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.currency}</td>
                <td>
                  {Number(Object.entries(expense.exchangeRates)
                    .find(
                      (eachCurrency) => eachCurrency[1].code === expense.currency,
                    )[1]
                    .ask).toFixed(2)}

                </td>
                <td>
                  {(Number(expense.value) * Number(Object.entries(expense.exchangeRates)
                    .find(
                      (eachCurrency) => eachCurrency[1].code === expense.currency,
                    )[1]
                    .ask)).toFixed(2)}

                </td>
                <td>
                  {Object.entries(expense.exchangeRates)
                    .find(
                      (eachCurrency) => eachCurrency[1].code === expense.currency,
                    )[1]
                    .name}

                </td>
                <td>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => {
                      editingExpenseChangeInputValues(expense);
                      dispatch(editExpenseRequest({ edit: true, id: expense.id }));
                    } }
                  >
                    <img
                      src={ editBtnLogo }
                      className="table--change-button-image"
                      alt="edit button logo"
                    />
                  </button>

                  <button
                    data-testid="delete-btn"
                    onClick={ () => dispatch(deleteExpense(expense.id)) }
                  >
                    <img
                      src={ trashBtnLogo }
                      className="table--change-button-image"
                      alt="trash button logo"
                    />

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
  editingExpenseChangeInputValues: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
