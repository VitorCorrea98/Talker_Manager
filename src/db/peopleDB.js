const connection = require('./connection');

const insert = (person) => connection.execute(
  `INSERT INTO talkers(
     name, age, talk_watched_at, talk_rate) VALUES ( ?, ?, ?, ?);`, 
  [person.name, person.age, person.talk.watchedAt, person.talk.rate],
);

const deleteID = (id) => connection.execute(
  `DELETE FROM talkers
    WHERE talkers.id = ?;`, [id],
);

module.exports = {
  insert,
  deleteID,
};