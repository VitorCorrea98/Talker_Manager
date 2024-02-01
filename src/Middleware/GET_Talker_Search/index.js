const readFile = require('../../fs/readFile');

const checkTalkerSearch = async (req, res, next) => {
  const searchParams = req.query.q;
  const recentContent = await readFile('src/talker.json');

  const peopleFound = recentContent.filter((talker) => talker.name.includes(searchParams));

  console.log({ searchParams, peopleFound });
  if (!searchParams) {
    res.status(200).json(recentContent);
  } else if (peopleFound.length === 0) {
    res.status(200).json(peopleFound);
  } else {
    return next();
  }
};

module.exports = checkTalkerSearch;