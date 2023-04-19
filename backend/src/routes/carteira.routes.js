const express = require('express');
const { findExpensesById, saveExpense } = require('../db/carteiraDB');
const { validateValue, validateDescription, validateMethod,
  validateCurrency, validateTag } = require('../middlewares/validateDespesa');

const router = express.Router();

router.get('/:id' , async (req, res) => {
  try {
    const { id } = req.params;
    const expenses = await findExpensesById(+id);
    return res.status(200).json(expenses);
  } catch (err) {
    return res.status(500).json({ message: err.message });
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