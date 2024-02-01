const checkRate = async (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  let message = '';
  const checkInteger = parseInt(rate, 10) === parseFloat(rate);

  if (rate === undefined) {
    message = 'O campo "rate" é obrigatório';
  } else if (!checkInteger || rate < 1 || rate > 5) {
    message = 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  } else {
    return next();
  }

  res.status(400).json({ message });
};

module.exports = checkRate;