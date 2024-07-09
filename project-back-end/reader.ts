import { SerialPort, ReadlineParser } from 'serialport';
import axios from 'axios';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

const port = new SerialPort({
  path: '/dev/ttyUSB0', // Substitua pelo caminho correto da sua porta serial
  baudRate: 9600,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

const apiUrl = 'http://localhost:3000/fuel-levels'; // URL da API Nest.js

// Função para fazer a requisição HTTP POST
const postData = async (data: object) => {
  try {
    const response = await axios.post(apiUrl, data);
    console.log('Data sent:', response.data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

// Escuta os dados recebidos da porta serial
const dataObservable = fromEvent(parser, 'data').pipe(
  map((data: string) => {
    try {
      // Converte a string recebida em um objeto JSON
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  })
);

// Envia os dados para a API Nest.js
dataObservable.subscribe((jsonData) => {
  if (jsonData) {
    postData(jsonData);
  }
});
