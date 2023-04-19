const connection = require("./connection")

const findExpensesById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM expenses WHERE user_id = ?', [id]);
  return result;
}

const saveExpense = async (despesa) => {
  const { value, description, tag, currency, method, user, exchangeRate } = despesa;

  const [[tagId]] = await connection.execute('SELECT tag_id FROM tags WHERE name = ?', [tag]);
  const [[moedaId]] = await connection.execute('SELECT currency_id FROM currencies WHERE initials = ?', [currency]);
  const [[metodoId]] = await connection.execute('SELECT payment_method_id FROM payment_method WHERE name = ?', [method]);
  const [[usuarioId]] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [user]);



  const [result] = await connection.execute(`INSERT INTO expenses
  (value, description, tag_id, currency_id, payment_method_id, user_id, exchange_rate ) 
  VALUES (?, ?, ?, ?, ?, ?)`, [value, description, tagId.tag_id, moedaId.moeda_id, metodoId.metodo_pagamento_id, usuarioId.usuario_id, exchangeRate]);
  return result;
};

module.exports = {
  findExpensesById,
  saveExpense
}