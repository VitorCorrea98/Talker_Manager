const fs = require('fs/promises');

const writeFile = async (path, content) => {
  await fs.writeFile(path, JSON.stringify(content, null, 3));
};

module.exports = writeFile;