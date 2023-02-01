// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_COINS = 'SAVE_COINS';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const UPDATE_TOTAL_EXPENSE = 'UPDATE_TOTAL_EXPENSE';

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const saveCoins = (payload) => ({
  type: SAVE_COINS,
  payload,
});

export const saveExpense = (payload) => ({
  type: SAVE_EXPENSE,
  payload,
});

export const fetchCoins = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(saveCoins(data)));
};
