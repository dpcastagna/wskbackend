import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCats = (req, res) => {
  console.log('Ollaan getCatsissä');
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'Cat item added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  const result = modifyCat(Number(req.params.id), req.body);
  if (result) {
    res.json({message: 'Cat item updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Not found.'});
  }
};

const deleteCat = (req, res) => {
  const result = removeCat(Number(req.params.id));
  if (result) {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.status(404).json({error: 404, message: 'Cat not found.'});
  }
};

export {getCats, getCatById, postCat, putCat, deleteCat};
