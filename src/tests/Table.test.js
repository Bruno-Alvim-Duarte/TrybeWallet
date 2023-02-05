import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import INITIAL_STATE_EXAMPLE from './helpers/expensesExample';

describe('Testa o componente Table e suas funcionalidades, presente na page Wallet', () => {
  const valuesExpected = '10.00';
  const description1Expected = 'Coxinha';
  const description2Expected = 'Parque de diversões';
  const currency1Expected = 'USD';
  const currency2Expected = 'EUR';
  const method1Expected = 'Dinheiro';
  const method2Expected = 'Cartão de crédito';
  const tag1Expected = 'Alimentação';
  const tag2Expected = 'Lazer';
  const coinCovert1Expected = 'Dólar Americano/Real Brasileiro';
  const coinCovert2Expected = 'Euro/Real Brasileiro';
  test('testa se os dados estão aparecendo na table', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE_EXAMPLE });

    expect(screen.getAllByText(valuesExpected)).toHaveLength(2);
    expect(screen.getByText(description1Expected)).toBeInTheDocument();
    expect(screen.getByText(description2Expected)).toBeInTheDocument();
    expect(screen.getAllByText(currency1Expected)).toHaveLength(2);
    expect(screen.getAllByText(currency2Expected)).toHaveLength(2);
    expect(screen.getAllByText(method1Expected)).toHaveLength(2);
    expect(screen.getAllByText(method2Expected)).toHaveLength(2);
    expect(screen.getAllByText(tag1Expected)).toHaveLength(2);
    expect(screen.getAllByText(tag2Expected)).toHaveLength(2);
    expect(screen.getByText(coinCovert1Expected)).toBeInTheDocument();
    expect(screen.getByText(coinCovert2Expected)).toBeInTheDocument();
  });

  test('Testa se é possível deletar uma despesa', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE_EXAMPLE },
    );

    const deleteBtn = screen.getAllByTestId('delete-btn');
    userEvent.click(deleteBtn[0]);
    expect(screen.getAllByText(valuesExpected)).toHaveLength(1);
    expect(screen.queryByText(description1Expected)).not.toBeInTheDocument();
    const state = store.getState();
    expect(state.wallet.expenses).toHaveLength(1);
  });

  test('Testa se é possível editar uma despesa', async () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: INITIAL_STATE_EXAMPLE },
    );

    const editBtn = screen.getAllByTestId('edit-btn');
    // User Actions
    userEvent.click(editBtn[0]);
    const editSaveBtn = screen.getByRole('button', { name: /editar despesa/i });
    expect(editSaveBtn).toBeInTheDocument();
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    userEvent.clear(valueInput);
    userEvent.clear(descriptionInput);

    userEvent.type(valueInput, '30');
    userEvent.type(descriptionInput, 'editando');
    userEvent.selectOptions(currencyInput, 'BTC');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Trabalho');
    userEvent.click(editSaveBtn);

    const state = store.getState();
    expect(state.wallet.editor).toBeTruthy();
    expect(state.wallet.idToEdit).toBe(0);

    const editedExpense = {
      value: '30',
      description: 'editando',
      currency: 'BTC',
      method: 'Cartão de débito',
      tag: 'Trabalho',
      id: 0,
    };
    await waitFor(() => {
      const stateUpdated = store.getState();
      return expect(stateUpdated.wallet.expenses[0]).toMatchObject(editedExpense);
      //
    });
  });
});
