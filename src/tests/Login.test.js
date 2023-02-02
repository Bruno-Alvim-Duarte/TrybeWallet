import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a pagina login', () => {
  const emailTestID = 'email-input';
  const passwordTestID = 'password-input';
  const myEmail = 'myEmail@gmail.com.br';
  const myPassword = 'myPassword123';

  it('Testa se é possível digitar nos inputs e os valores são recebidos', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passwordTestID);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    userEvent.type(emailInput, 'bla');
    userEvent.type(passwordInput, 'bla123');
    expect(emailInput.value).toBe('bla');
    expect(passwordInput).toHaveValue('bla123');
  });

  it('Testa se o botão começa desabilitado, e é habilitado quando for valido', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passwordTestID);

    userEvent.type(emailInput, myEmail);
    userEvent.type(passwordInput, myPassword);

    expect(button).toBeEnabled();
  });

  it('Testa se ao clickar em entrar você é redirecionado pra /carteira e o email é salvo no estado global', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button');

    const emailInput = screen.getByTestId(emailTestID);
    const passwordInput = screen.getByTestId(passwordTestID);

    userEvent.type(emailInput, myEmail);
    userEvent.type(passwordInput, myPassword);

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
    const state = store.getState();
    expect(state.user.email).toBe('myEmail@gmail.com.br');
  });
});
