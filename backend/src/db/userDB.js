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
  const [result] = await connection.execute('INSERT INTO useRS (email, name) VALUES (?, ?)', [user.email, user.name]);
  return result;
}

module.exports = {
  findUserById,
  saveNewUser,
  findUserByEmail,
}