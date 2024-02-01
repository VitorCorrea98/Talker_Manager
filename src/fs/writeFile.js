const fs = require('fs/promises');

const writeFile = async (path, content) => {
  await fs.writeFile(path, JSON.stringify(content, null, 2));
};

module.exports = writeFile;