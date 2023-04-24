const { findUserByEmail } = require("../db/userDB");

const validateEmail = async (req, _res, next) => {
  const {email} = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  if (email === undefined) {
    return next({ statusCode: 400, message: "O campo 'email' é obrigatório"});
  }

  if (!regex.test(email)) {
    return next({ statusCode: 400, message: "O campo 'email' deve ter um email válido"});
  }

  next();
};

const validatePassword = (req, _res, next) => {
  const {password} = req.body;

  if (password === undefined) {
    return next({ statusCode: 400, message: "O campo 'password' é obrigatório"});
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};