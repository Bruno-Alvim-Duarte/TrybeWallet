// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SAVE_COINS, SAVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_COINS:
    delete action.payload.USDT;
    return {
      ...state,
      currencies: Object.keys(action.payload),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  default:
    return state;
  }
};

export default walletReducer;
