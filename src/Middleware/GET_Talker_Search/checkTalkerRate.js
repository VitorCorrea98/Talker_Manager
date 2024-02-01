const checkTalkerRate = async (req, res, next) => {
  const searchRate = req.query.rate;
  const searchParam = req.query.q;

  const checkInteger = parseInt(searchRate, 10) === parseFloat(searchRate);
  const message = 'O campo "rate" deve ser um número inteiro entre 1 e 5';

  if ((!checkInteger || Number(searchRate) < 1 
  || Number(searchRate) > 5) && searchParam === undefined) {
    return res.status(400).json({ message });
  }
  return next();
};

module.exports = checkTalkerRate;