const getTalker = async (id, talkers) => talkers.find((talker) => talker.id === Number(id));

module.exports = getTalker;