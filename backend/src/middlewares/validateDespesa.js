const validateValue = async (req, _res, next) => {
  const { value } = req.body;

  if (value === undefined) {
    return next({ statusCode: 400, message: "o campo 'value' deve existir" })
  }

  if (Number.isNaN(value)) {
    return next({ statusCode: 400, message: "o campo 'value' deve ser um número" })
  }

  next();
};

const validateDescription = async (req, _res, next) => {
  const { description } = req.body;

  if (description === undefined) {
    return next({ statusCode: 400, message: "o campo 'description' deve existir" });
  }
  next();
};

const validateCurrency = async (req, _res, next) => {
  const { currency } = req.body;
  const currencies =  ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DODGE'];

  if (currency === undefined) {
    return next({ statusCode: 400, message: "o campo 'currency' deve existir" });
  };

  if (!currency in currencies) {
    return next({ statusCode: 400, message: "o campo 'currency' deve ser uma moeda válida"});
  };

  next();
};

const validateMethod = async (req, _res, next) => {
  const { method } = req.body;

  const methods = ['Cartao de credito', 'Cartao de debito', 'Dinheiro'];

  if (method === undefined) {
    return next({ statusCode: 400, message: "o campo 'método de pagamento' deve existir" });
  }

  if (!method in methods) {
    return next({ statusCode: 400, message: "o campo 'método de pagamento' deve ser uma método válido"});
  }

  next();
};

const validateTag = async (req, _res, next) => {
  const { tag } = req.body;

  const tags = ['Alimentacao', 'Lazer', 'Trabalho', 'Transporte', 'Saude'];

  if (tag === undefined) {
    return next({ statusCode: 400, message: "o campo 'tag' deve existir" });
  }

  if (!tag in tags) {
    return next ({ statusCode: 400, message: "o campo 'tag' deve ser uma tag válida"});
  }

  next();
};

module.exports = {
  validateValue,
  validateDescription,
  validateMethod,
  validateTag,
  validateCurrency,
}