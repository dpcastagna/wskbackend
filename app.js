import express from 'express';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

const cats = [
  {
    cat_id: 1,
    name: 'Nasu',
    birthdate: '20220909',
    weight: 8,
    owner: 'Nalle Puh',
    image: 'https://placecats.com/300/200',
  },
  {
    cat_id: 2,
    name: 'Ihaa',
    birthdate: '20240814',
    weight: 12,
    owner: 'Nalle Puh',
    image: 'https://placecats.com/300/200',
  },
];

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

app.get('/api/v1/cats/:id', (req, res) => {
  console.log('path variables', req.params);

  const foundCat = cats.find((cat) => Number(req.params.id) === cat.cat_id);

  if (!foundCat) {
    res.status(404).json({message: 'Cat not found!'});
  }
  res.json(foundCat);
});

app.use('/public', express.static('public'));

app.post('/api/v1/cats', (req, res) => {
  console.log('request: ', req.body);
  res.sendStatus(201);
});
