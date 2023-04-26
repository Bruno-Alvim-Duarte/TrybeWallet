const express = require('express');
const { findUserById, saveNewUser, findUserByEmail } = require('../db/userDB');
const { validateEmail, validatePassword } = require('../middlewares/validateUser');
const bcryptjs = require('bcryptjs');

const router = express.Router();


router.post('/signin', validateEmail, validatePassword, async (req, res) => {
  try {
    const { password } = req.body;
    const { email } = req.query;
    
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Erro: Email ou senha incorreta!'});
    }

    if (!(await bcryptjs.compare(password, user.password))) {
      return res.status(400).json({ message: 'Erro: Email ou senha incorreta!'});
    }

    return res.status(200).json({ message: 'Login feito com sucesso'});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})


router.post('/', validateEmail, validatePassword, async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCheck = await findUserByEmail(email);
    console.log(userCheck);
    if (userCheck) {
      return res.status(400).json({ message: 'Este email ja está cadastrado'});
    }
    const user = {
      email, 
      password: bcryptjs.hashSync(password, 8),
    }

    const result = await saveNewUser(user);
    if (result.affectedRows > 0) return res.status(201).json({ message: "novo usuario cadastrado com sucesso"});
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const user = await findUserById(+id);
    if (!user) return res.status(404).json({ message: 'usuario não encontrado'});
    return res.status(200).json(user)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
});
module.exports = router