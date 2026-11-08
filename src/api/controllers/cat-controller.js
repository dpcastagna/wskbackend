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
  console.log(req.body.birthdate);

  const result = await addCat(req.body);
  console.log(result);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'Cat item added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(Number(req.params.id), req.body);
  if (result) {
    res.json({message: 'Cat item updated!'});
  } else {
    res.status(404).json({error: 404, message: 'Cat not found.'});
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(Number(req.params.id));
  if (result) {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.status(404).json({error: 404, message: 'Cat not found.'});
  }
};

export {getCats, getCatById, postCat, putCat, deleteCat};
