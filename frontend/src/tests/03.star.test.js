import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import App from '../App';

describe('Star test 3', () => {
  test('Star test 3', async () => {
    jest.spyOn(global, 'fetch');
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    // 1, 2, 3

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();

    // 4

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');

    // 5, 6

    delete mockData.USDT;
    const currenciesExpected = Object.keys(mockData);

    await waitFor(() => {
      const state = store.getState();
      const sortedStateCurrencies = [...state.wallet.currencies].sort();
      const sortedCurrenciesExpected = [...currenciesExpected].sort();
      return expect(sortedStateCurrencies).toEqual(sortedCurrenciesExpected);
    });

    const state = store.getState();
    state.wallet.currencies.forEach((currencie, index) => {
      expect(currencie).toEqual(currencyInput.options[index].value);
    });

    // 7

    const methodInput = screen.getByTestId('method-input');
    const expectedMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    expectedMethods.forEach((expectedMethod, index) => {
      expect(expectedMethod).toEqual(methodInput.options[index].value);
    });

    // 8

    const tagInput = screen.getByTestId('tag-input');
    const expectedTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    expectedTags.forEach((expectedTag, index) => {
      expect(expectedTag).toEqual(tagInput.options[index].value);
    });
  });
});
