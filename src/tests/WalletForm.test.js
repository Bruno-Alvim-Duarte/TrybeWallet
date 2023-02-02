import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';
import expenses from './helpers/expenseFormat';

describe('testa o componente WalletForm presente na page Wallet', () => {
  const userCreateExpense = async () => {
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'coxinha');
    userEvent.selectOptions(methodInput, 'Cartão de crédito');
    await waitFor(() => userEvent.selectOptions(currencyInput, 'EUR'));
    userEvent.selectOptions(tagInput, 'Alimentação');
  };

  test('testa se é possível selecionar valores em todos os inputs', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    await userCreateExpense();
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addButton = screen.getByRole('button');
    expect(valueInput).toHaveValue(10);
    expect(descriptionInput).toHaveValue('coxinha');
    expect(currencyInput).toHaveValue('EUR');
    expect(methodInput).toHaveValue('Cartão de crédito');
    expect(tagInput).toHaveValue('Alimentação');
    expect(addButton).toBeInTheDocument();
  });

  test('testa se ao adicionar a despesa ela vai pro estado global e no formato correto', async () => {
    const { store } = renderWithRouterAndRedux(<WalletForm />);

    await userCreateExpense();

    const addButton = screen.getByRole('button');
    userEvent.click(addButton);
    await waitFor(
      () => {
        const state = store.getState();
        return expect(state.wallet.expenses[0]).toMatchObject(expenses[0]);
      },
      { timeout: 4000 },
    );
  });
});
