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
const checkAuth = require('./Middleware/POST_Talker/checkAuth');
const { 
  checkTalkerSearch, 
  checkTalkerRate, 
  checkTalkerDate } = require('./Middleware/GET_Talker_Search');
const checkPatchRate = require('./Middleware/PATCH_Talker_Id/checkPatchRate');
// const writeID = require('./fs/writeID');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const PATH = 'src/talker.json';
// const ID = 'src/ID.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await readFile(PATH);
  res.status(200).json(talkers);
});

app.get('/talker/search', 
  checkAuth, 
  checkTalkerSearch, 
  checkTalkerRate, 
  checkTalkerDate, async (req, res) => {
    const { query } = req;
    const { q, rate, date } = query;
    const recentTalkers = await readFile(PATH);

    const talkersFound = q ? (
      recentTalkers.filter((talker) => talker.name.includes(q))
    ) : recentTalkers;

    const filteredRate = rate ? talkersFound
      .filter((talker) => Number(talker.talk.rate) === Number(rate)) : talkersFound;

    const filteredDate = date ? (
      filteredRate
        .filter((talker) => talker.talk.watchedAt === date)) : filteredRate;

    res.status(200).json(filteredDate);
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
    const recentContent = await readFile(PATH);
    const id = recentContent.length + 1;
    const newTalker = {
      id,
      ...req.body,
    };

    await writeFile(PATH, [...recentContent, newTalker]);
    res.status(201).json(newTalker);
  });

app.put('/talker/:id',
  chekAuth, 
  checkName, 
  checkAge, 
  checkTalk, 
  checkWatchedAt, 
  checkRate, 
  checkId, async (req, res) => {
    const oldTalkers = await readFile(PATH);
    const { id } = req.params;
    const choosenTalker = oldTalkers.find((talker) => talker.id === Number(id));
    const { name, age, talk } = req.body;

    choosenTalker.name = name;
    choosenTalker.age = age;
    choosenTalker.talk = talk;

    const formatedTalker = {
      id: Number(id),
      ...choosenTalker,
    };

    await writeFile(PATH, oldTalkers);
    res.status(200).json(formatedTalker);
  });

app.delete('/talker/:id', checkAuth, async (req, res) => {
  const recentContent = await readFile(PATH);
  const { id } = req.params;
  const removedTalker = recentContent.filter((talker) => talker.id !== Number(id));

  await writeFile(PATH, removedTalker);
  res.status(204).end();
});

app.patch('/talker/rate/:id', checkAuth, checkPatchRate, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const talkers = await readFile(PATH);

  const choosenTalker = talkers.find((talker) => talker.id === Number(id));

  choosenTalker.talk.rate = rate;

  await writeFile(PATH, talkers);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
