const fs = require('fs');
const crypto = require('crypto');


const generate = () => {
  const secret = 'abcdefg';

  const hash = crypto.createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');

  const generateJson = [];
  for (let index = 0; index < 100; index++) {
    generateJson.push({ message: `Item de numero ${index}`, random: Math.random(), id: index.toString(), hash });
  }

  fs.writeFile('ListJson.json', JSON.stringify(generateJson), (err) => {
    if (err) throw err;
    console.log('complete');
  }
  );
  return generateJson;
}

module.exports = generate;
// generate();