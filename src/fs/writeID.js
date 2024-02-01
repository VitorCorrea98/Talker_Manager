const fs = require('fs/promises');

const writeID = async (path, content) => {
  await fs.writeFile(path, JSON.stringify(content));
};

module.exports = writeID;