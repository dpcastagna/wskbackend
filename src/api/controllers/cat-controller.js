import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';
import {findUserById} from '../models/user-model.js';

const getCats = async (req, res) => {
  const cats = await listAllCats();
  if (cats.length > 0) {
    for (const cat of cats) {
      const owner = await findUserById(cat.owner);
      cat.ownername = owner.name;
    }
  }
  res.json(cats);
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);

  if (cat) {
    const owner = await findUserById(cat.owner);
    cat.ownername = owner.name;
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  console.log(req.file);
  req.body.filename = req.file.filename;

  const cat = req.body;
  const user = res.locals.user;
  console.log(req.body, user);

  const result = await addCat(cat, user);
  console.log(result);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'Cat item added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const id = Number(req.params.id);
  const cat = req.body;
  const user = res.locals.user;
  const result = await modifyCat(id, cat, user);
  if (result) {
    res.json({message: 'Cat item updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Cat not found.'});
  }
};

const deleteCat = async (req, res) => {
  const id = Number(req.params.id);
  const user = res.locals.user;
  console.log('user', user);

  const result = await removeCat(id, user);
  if (result) {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.status(404).json({error: 404, message: 'Cat not found.'});
  }
};

export {getCats, getCatById, postCat, putCat, deleteCat};
