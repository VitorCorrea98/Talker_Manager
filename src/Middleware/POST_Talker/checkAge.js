const checkAge = async (req, res, next) => {
  const { age } = req.body;
  let message = '';

  const verifyAge = parseInt(age, 10) === parseFloat(age);

  if (!age) {
    message = 'O campo "age" é obrigatório';
  } else if (!verifyAge || age < 18) {
    message = 'O campo "age" deve ser um número inteiro igual ou maior que 18';
  } else {
    return next();
  }

  res.status(400).json({ message });
};

module.exports = checkAge;