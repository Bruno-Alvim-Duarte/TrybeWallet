const connection = require("./connection");
const findExpensesById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM expenses WHERE user_id = ?', [id]);
  const promiseObjectsToReturn = result.map(async (expense) => {
    const { value, description, currency_id, exchange_rate,
       payment_method_id, tag_id, currency_name, expense_id } = expense;
    
    const [[currency]] = await connection.execute(
      'SELECT initials FROM currencies WHERE currency_id = ?',
      [currency_id]
      );

    const exchangeRate = exchange_rate;

    const [[method]] = await connection.execute(
      'SELECT name FROM payment_method WHERE payment_method_id = ?',
      [payment_method_id]
    );

    const [[tag]] = await connection.execute(
      'SELECT name FROM tags WHERE tag_id = ?',
      [tag_id]
    );

    return {
      id: expense_id,
      value,
      description,
      currency: currency.initials,
      exchangeRate,
      method: method.name,
      tag: tag.name,
      currencyName: currency_name
    }

  });
  
  const objectsToReturn =  await Promise.all(promiseObjectsToReturn);
  
  return objectsToReturn;
}

const saveExpense = async (despesa) => {
  const { value, description, tag, currency, method, user, exchangeRate, currencyName } = despesa;


  const [[tagId]] = await connection.execute('SELECT tag_id FROM tags WHERE name = ?', [tag]);
  const [[moedaId]] = await connection.execute('SELECT currency_id FROM currencies WHERE initials = ?', [currency]);
  const [[metodoId]] = await connection.execute('SELECT payment_method_id FROM payment_method WHERE name = ?', [method]);
  const [[usuarioId]] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [user]);



  const [result] = await connection.execute(`INSERT INTO expenses
  (value, description, tag_id, currency_id, payment_method_id, user_id, exchange_rate, currency_name) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [value, description, tagId.tag_id, moedaId.currency_id, metodoId.payment_method_id, usuarioId.user_id, exchangeRate, currencyName]);
  return result;
};

const deleteExpense = async (id) => {
  const [result] = await connection.execute(`DELETE FROM expenses WHERE expense_id = ?`, [id]);
  return result.affectedRows;
};

const findByExpenseId = async (id) => {
  const [[result]] = await connection.execute(`SELECT * FROM expenses WHERE expense_id = ?`, [id]);
  return result;
}

const editExpenseById = async (id, despesa) => {
  const { value, description, tag, currency, method, exchangeRate, currencyName } = despesa;

  const [[tagId]] = await connection.execute('SELECT tag_id FROM tags WHERE name = ?', [tag]);
  const [[moedaId]] = await connection.execute('SELECT currency_id FROM currencies WHERE initials = ?', [currency]);
  const [[metodoId]] = await connection.execute('SELECT payment_method_id FROM payment_method WHERE name = ?', [method]);
  const [{ affectedRows }] = await connection.execute(`UPDATE expenses SET value = ?,
   description = ?, tag_id = ?, currency_id = ?, payment_method_id = ?,
   exchange_rate = ?, currency_name = ? WHERE expense_id = ?`,
   [value, description, tagId.tag_id, moedaId.currency_id, metodoId.payment_method_id, exchangeRate, currencyName, id]);
   return affectedRows;
};

module.exports = {
  findExpensesById,
  saveExpense,
  deleteExpense,
  findByExpenseId,
  editExpenseById
}