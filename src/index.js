const express = require('express');
const randomToken = require('random-token');
const readFile = require('./fs/readFile');
const checkId = require('./Middleware/GET_Talker_Id');
const checkLogin = require('./Middleware/POST_Login');
const { 
  checkAge, 
  checkName, 
  chekAuth, 
  checkWatchedAt, 
  checkTalk,
  checkRate } = require('./Middleware/POST_Talker');
const writeFile = require('./fs/writeFile');
// const checkNewTalkerPOST = require('./Middleware/POST_Talker');

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

app.post('/login', checkLogin, async (_req, res) => {
  const token = randomToken(16);
  
  res.status(200).json({ token });
});

app.post('/talker', 
  chekAuth, 
  checkName, 
  checkAge, 
  checkTalk, 
  checkWatchedAt, 
  checkRate, async (req, res) => {
    const recentTalkers = await readFile(PATH);
    const id = recentTalkers.length + 1;
    const newTalker = {
      id,
      ...req.body,
    };

    await writeFile(PATH, newTalker);

    res.status(201).json(newTalker);
  });

app.listen(PORT, () => {
  console.log('Online');
});
