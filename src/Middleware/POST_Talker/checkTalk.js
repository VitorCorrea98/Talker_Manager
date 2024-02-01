const checkTalk = async (req, res, next) => {
  const { talk } = req.body;
  let message = '';

  if (!talk) {
    message = 'O campo "talk" é obrigatório';
  } else {
    return next();
  }

  res.status(400).json({ message });
};

module.exports = checkTalk;