const express = require('express');
const randomToken = require('random-token');
const readFile = require('./fs/readFile');
const checkId = require('./Middleware/checkId');
const checkLogin = require('./Middleware/checkLogin');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const PATH = 'src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile(PATH);
  res.status(200).json(talkers);
});

app.get('/talker/:id', checkId, async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile(PATH);

  const talker = talkers.find((talk) => talk.id === Number(id));

  res.status(200).json(talker);
});

app.post('/login', checkLogin, async (req, res) => {
  const token = randomToken(16);

  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
