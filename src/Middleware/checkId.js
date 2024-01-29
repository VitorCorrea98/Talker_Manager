const readFile = require('../fs/readFile');

const checkId = async (req, res, next) => {
  const talkers = await readFile('src/talker.json');
  const { id } = req.params;

  const check = talkers.some((talker) => talker.id === Number(id));

  if (check) {
    next();
  } else {
    const message = 'Pessoa palestrante não encontrada';
    res.status(404).json({ message });
  }
};

module.exports = checkId;