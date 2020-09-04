const generate = require('./generate');
const json = require('./ListJson.json');

const generateJson = () => {
  if (json) {
    return json;
  }
  return generate();
}

module.exports = generateJson;