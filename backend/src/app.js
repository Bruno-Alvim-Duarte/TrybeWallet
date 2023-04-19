const express = require('express');
const carteiraRouter = require('./routes/carteira.routes');
const userRouter = require('./routes/user.routes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/carteira', carteiraRouter);

app.use('/user', userRouter);

app.use(async (err, _req, res, _next) => {
  const { statusCode, message } = err;
  return res.status(statusCode).json({ message });
})

module.exports = app;