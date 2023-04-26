const express = require('express');
const { findExpensesById, saveExpense, deleteExpense, findByExpenseId } = require('../db/carteiraDB');
const { validateValue, validateDescription, validateMethod,
  validateCurrency, validateTag } = require('../middlewares/validateDespesa');
const { findUserByEmail } = require('../db/userDB');

const router = express.Router();

router.get('/searchByEmail', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await findUserByEmail(email);
    const expenses = await findExpensesById(user.user_id);
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get('/:id' , async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await findExpensesById(+id);
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await findByExpenseId(+id);
    if (!expense) return res.status(404).json({ message: 'despesa não encontrada'});
    await deleteExpense(+id);

    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err.message})
  }
});


router.post('/', validateValue, validateDescription, validateMethod,
 validateCurrency, validateTag, async (req, res) => {
  try {
    const expense = req.body;

    const result = await saveExpense(expense);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports =  router;