import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

test('requisito 1 startest', () => {
  // 1
  const { history, store } = renderWithRouterAndRedux(<App />);
  expect(history.location.pathname).toBe('/');
  // 2
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  // 3
  const button = screen.getByRole('button', { name: 'Entrar' });
  expect(button).toBeDisabled();

  userEvent.type(emailInput, 'invalidEmail');
  userEvent.type(passwordInput, 'aaaaaa');
  expect(button).toBeDisabled();

  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);

  userEvent.type(emailInput, 'validEmail@gmail.com');
  userEvent.type(passwordInput, 'aa');
  expect(button).toBeDisabled();

  userEvent.clear(emailInput);
  userEvent.clear(passwordInput);

  userEvent.type(emailInput, 'myEmail@gmail.com');
  userEvent.type(passwordInput, 'myPassword123');
  expect(button).toBeEnabled();

  // 4
  userEvent.click(button);
  const state = store.getState();
  expect(state.user.email).toBe('myEmail@gmail.com');
  // 5
  expect(history.location.pathname).toBe('/carteira');
});
