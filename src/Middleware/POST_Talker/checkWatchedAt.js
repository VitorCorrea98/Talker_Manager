const checkWatchedAt = async (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  let message = '';

  const testWatchedAt = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/.test(watchedAt);

  if (!watchedAt) {
    message = 'O campo "watchedAt" é obrigatório';
  } else if (!testWatchedAt) {
    message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  } else {
    return next();
  }

  res.status(400).json({ message });
};

module.exports = checkWatchedAt;