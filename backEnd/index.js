const express = require('express');
const cors = require('cors');
const { unparse } = require('papaparse')
const app = express();

const generateJson = require('./createBigList')
const port = 4000

const sendAndSleep = (response, counter, type) => {
  if (counter > 10) {
    response.end();
  } else {
    if (type) {
      const csv = unparse(JSON.stringify(generateJson()), { delimiter: ';', header: true });
      response.write(csv);
    }
    response.write(JSON.stringify(generateJson()));
    counter++;
    setTimeout(function () {
      sendAndSleep(response, counter);
    }, 6000)
  };
}

app.use(cors());

app.get('/streamList', async (req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  sendAndSleep(res, 1, false);
})

app.get('/generateCSVList', (req, res) => {
  res.header('Content-Type', 'text/csv');
  res.attachment(`Download-Stream-List.csv`);
  sendAndSleep(res, 1, true);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})