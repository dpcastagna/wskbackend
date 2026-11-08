const cats = [
  {
    cat_id: 3,
    name: 'Nasu',
    birthdate: '2022-09-09',
    weight: 8,
    owner: 'Nalle Puh',
    image: 'https://placecats.com/300/200',
  },
  {
    cat_id: 2,
    name: 'Ihaa',
    birthdate: '2024-08-14',
    weight: 12,
    owner: 'Nalle Puh',
    image: 'https://placecats.com/300/200',
  },
  {
    cat_id: 1,
    name: 'Jänis',
    birthdate: '2014-05-01',
    weight: 10,
    owner: 'Risto Reipas',
    image: 'https://placecats.com/300/200',
  },
];

const listAllCats = () => {
  return cats;
};

const findCatById = (id) => {
  return cats.find((item) => item.cat_id == id);
};

const addCat = (cat) => {
  const {name, weight, owner, image, birthdate} = cat;
  console.log(cat.image);
  const newId = cats[0].cat_id + 1;
  cats.unshift({
    cat_id: newId,
    name,
    weight,
    owner,
    image,
    birthdate,
  });
  return {cat_id: newId};
};

const modifyCat = (id, newDetails) => {
  const index = cats.findIndex((cat) => id === cat.cat_id);
  // create new object and combine properties/values of two objects inside it
  cats[index] = {...cats[index], ...newDetails};
  // palauttaa true, jos muokkaus onnistui
  return index !== -1;
};

const removeCat = (id) => {
  const index = cats.findIndex((cat) => cat.cat_id === id);
  cats.splice(index, 1);
  return index !== -1;
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat};
