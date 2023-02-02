import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
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
                    .find((eachCurrency) => eachCurrency[1].code === expense.currency)[1]
                    .ask).toFixed(2)}

                </td>
                <td>
                  {(Number(expense.value) * Number(Object.entries(expense.exchangeRates)
                    .find((eachCurrency) => eachCurrency[1].code === expense.currency)[1]
                    .ask)).toFixed(2)}

                </td>
                <td>
                  {Object.entries(expense.exchangeRates)
                    .find((eachCurrency) => eachCurrency[1].code === expense.currency)[1]
                    .name}

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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
