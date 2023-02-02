import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Header from '../components/Header';
import INITIAL_STATE_EXAMPLE from './helpers/expensesExample';

describe('Testa o componente Header presente na pagina Wallet', () => {
  test('testa se aparece certo a despesa total e se o email é renderizado corretamente', () => {
    renderWithRouterAndRedux(<Header />, { initialState: INITIAL_STATE_EXAMPLE });

    const expectExpenseTotal = '106.12';
    const totalField = screen.getByTestId('total-field');
    expect(totalField).toHaveTextContent(expectExpenseTotal);

    const emailField = screen.getByTestId('email-field');
    expect(emailField).toHaveTextContent('brunoalvimduarte@gmail.com');
  });
});
