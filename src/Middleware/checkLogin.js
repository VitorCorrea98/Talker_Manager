function checkLogin(req, res, next) {
  const { email, password } = req.body;
  let message = '';

  if (!email) {
    message = 'O campo "email" é obrigatório';
  } else if (!(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i).test(email)) {
    message = 'O "email" deve ter o formato "email@email.com"';
  } else if (!password) {
    message = 'O campo "password" é obrigatório';
  } else if (password.length < 6) {
    message = 'O "password" deve ter pelo menos 6 caracteres';
  } else {
    return next();
  }

  res.status(400).json({ message });
}

module.exports = checkLogin;