const connection = require("./connection")

const findUserById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [id]);
  return result;
};

const findUserByEmail = async (email) => {
  const [[result]] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  return result;
}

const saveNewUser = async (user) => {
  const [result] = await connection.execute('INSERT INTO users (email, password) VALUES (?, ?)', [user.email, user.password]);
  return result;
}

module.exports = {
  findUserById,
  saveNewUser,
  findUserByEmail,
}