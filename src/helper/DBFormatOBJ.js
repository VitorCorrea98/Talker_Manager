const DBFormatOBJ = (array) => array.reduce((acc, curr) => {
  const newTalker = {
    id: curr.id,
    name: curr.name,
    age: curr.age,
    talk: {
      watchedAt: curr.talk_watched_at,
      rate: curr.talk_rate,
    },
  };

  return [...acc, newTalker];
}, []);

module.exports = DBFormatOBJ;