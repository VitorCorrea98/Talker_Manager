const readFile = require('../../fs/readFile');
const otherQueriesUndefined = require('../../helper/otherUndefined');

const checkTalkerDate = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readFile('src/talker.json');

  const message = 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"';
  const testWatchedAt = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/.test(date);
  const othersUndefined = otherQueriesUndefined(rate, q);
  console.log({ date, testWatchedAt });

  if (!testWatchedAt && date) {
    res.status(400).json({ message });
  } else if (!date && othersUndefined) {
    res.status(200).json(talkers);
  } else {
    return next();
  }
};

module.exports = checkTalkerDate;