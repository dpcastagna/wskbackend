import express from 'express';
import router from './api/index.js';
import requestTime from './middlewares/request-time.js';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';
import cors from 'cors';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(requestTime);

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/api/v1', router);

// Default for all routes not handled by routers above
app.use(notFoundHandler);
// Add error handler middleware as the last middleware in the chain
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
