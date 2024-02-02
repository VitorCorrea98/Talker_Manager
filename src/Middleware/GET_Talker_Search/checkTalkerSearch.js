const readFile = require('../../fs/readFile');
const otherQueriesUndefined = require('../../helper/otherUndefined');

const checkTalkerSearch = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const recentContent = await readFile('src/talker.json');

  const peopleFound = recentContent.filter((talker) => talker.name.includes(q));
  const othersUndefined = otherQueriesUndefined(rate, date);

  if (!q && othersUndefined) {
    res.status(200).json(recentContent);
  } else if (peopleFound.length === 0 && othersUndefined) {
    res.status(200).json(peopleFound);
  } else {
    return next();
  }
};

module.exports = checkTalkerSearch;