const express = require('express');
const { findUserById, saveNewUser } = require('../db/userDB');
const { validateEmail } = require('../middlewares/validateUser');

const router = express.Router();

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

router.post('/', validateEmail, async (req, res) => {
  try {
    const user = req.body;

    const result = await saveNewUser(user);
    if (result.affectedRows > 0) return res.status(201).json({ message: "novo usuario cadastrado com sucesso"});
  } catch (error) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router