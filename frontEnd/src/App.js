import React, { useState, useEffect, useCallback } from 'react';
import { unparse } from 'papaparse';
import {  createWriteStream } from 'streamsaver';
import { Streamlist } from './components';

function App() {
  const [list, setList] = useState([]);

  const handleFinalStream = async () => {
    try {
      const fileStream = createWriteStream('list.csv');
      const writer = fileStream.getWriter()
      const response = await fetch('http://localhost:4000/streamList');

      const reader = response.body.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          writer.close();
          break;
        }
        writer.write(new TextEncoder("utf-8")
          .encode(
            unparse(JSON
              .parse(new TextDecoder("utf-8")
                .decode(value)), { delimiter: ';', header: true }
            )
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const listFetch = useCallback(async () => {
    const response = await fetch('http://localhost:4000/streamList');
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const json = new TextDecoder("utf-8").decode(value);
      setList(prevState => {
        if (prevState.length > 0) {
          const concat = JSON.parse(json).concat(prevState);
          return concat;
        }
        return JSON.parse(json);
      });
    }
  }, [])

  useEffect(() => {
    listFetch();
  }, [listFetch]);


  return (
    <div style={{ margin: '2rem auto', width: '1000px' }}>
      <div style={{ float: 'left', width: '100%' }}>
        <h1 style={{ marginBottom: '1rem' }}>Controle de Stream</h1>
      </div>

      <div style={{ border: '1px solid #ccc', width: '49%', height: '600px', float: 'left', overflow: 'auto' }}>
        <Streamlist list={list} />
      </div>
      <div style={{ float: 'right', width: '48%' }}>
        <h1>Importa para excel </h1>
        <div>
          <button onClick={handleFinalStream}> Click aqui para baixar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
