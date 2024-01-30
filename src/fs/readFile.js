const fs = require('fs/promises');

const readFile = async (path) => {
  const fileConent = await fs.readFile(path);
  const content = JSON.parse(fileConent);

  return content;
};

module.exports = readFile;