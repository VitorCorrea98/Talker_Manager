const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  let message = '';

  if (!authorization) {
    message = 'Token não encontrado';
  } else if (authorization.length !== 16 || typeof authorization !== 'string') {
    message = 'Token inválido';
  } else {
    return next();
  }

  res.status(401).json({ message });
};

module.exports = checkAuth;