const fs = require('fs/promises');
const path = require('path');

// __dirname = ./helpers/
// filePath = ./helpers/../Task8_data.json
// Resolved = ./Task8_data.json
const filePath = path.join(__dirname, '../../public/testdata', 'Task8_data.json');

const readFile = async () => {
  const content = await fs.readFile(filePath, 'utf8');
  return JSON.parse(content);
}

const writeFile = async (data) => {
  return fs.writeFile(filePath, JSON.stringify(data, null, 2));
}


const writeLogFile = (data) => {
  return fs.appendFile(path.join(__dirname, '../logs.txt'), data);
}
module.exports = {
  readFile,
  writeFile,
  writeLogFile
}