const readFile = require('../../fs/readFile');

const checkTalkerSearch = async (req, res, next) => {
  const searchParams = req.query.q;
  const searchRate = req.query.rate;
  const recentContent = await readFile('src/talker.json');

  const peopleFound = recentContent.filter((talker) => talker.name.includes(searchParams));

  if (!searchParams && searchRate === undefined) {
    res.status(200).json(recentContent);
  } else if (peopleFound.length === 0 && searchRate === undefined) {
    res.status(200).json(peopleFound);
  } else {
    return next();
  }
};

module.exports = checkTalkerSearch;