import express from 'express';
import router from './api/index.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use('/api/v1', router);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
