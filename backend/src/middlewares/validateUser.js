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

  const user = await findUserByEmail(email);
  if (user) {
    return next({ statusCode: 400, message: "Este email ja está cadastrado" });
  }

  next();
};

const validateName = (req, _res, next) => {
  const {nome} = req.body;

  if (nome === undefined) {
    return next({ statusCode: 400, message: "O campo 'nome' é obrigatório"});
  }

  next();
};

module.exports = {
  validateEmail,
  validateName,
};