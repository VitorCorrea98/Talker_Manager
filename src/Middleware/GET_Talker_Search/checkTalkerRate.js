const checkInteger = require('../../helper/checkInteger_1_5');
const otherQueriesUndefined = require('../../helper/otherUndefined');

const checkTalkerRate = async (req, res, next) => {
  const { q, rate, date } = req.query;

  const checkForInteger = checkInteger(rate);
  const message = 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  const othersUndefined = otherQueriesUndefined(q, date);

  if (checkForInteger && othersUndefined) {
    return res.status(400).json({ message });
  }
  return next();
};

module.exports = checkTalkerRate;