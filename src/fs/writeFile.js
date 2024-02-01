const fs = require('fs/promises');
const readFile = require('./readFile');

const writeFile = async (path, content) => {
  const recentContent = await readFile(path);
  await fs.writeFile(path, JSON.stringify([...recentContent, content], null, 2));
};

module.exports = writeFile;