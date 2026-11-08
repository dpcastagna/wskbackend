const users = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'jossword',
  },
  {
    user_id: 360,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@metropolia.fi',
    role: 'user',
    password: 'jassword',
  },
  {
    user_id: 36,
    name: 'Matti Meikalainen',
    username: 'mattimei',
    email: 'matti@metropolia.fi',
    role: 'user',
    password: 'mattword',
  },
  {
    user_id: 3,
    name: 'Maija Meikalainen',
    username: 'maijamei',
    email: 'maija@metropolia.fi',
    role: 'user',
    password: 'maijword',
  },
];

const listAllUsers = () => {
  return users;
};

const findUserById = (id) => {
  return users.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = users[0].user_id + 1;
  users.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
};

const modifyUser = (id, newDetails) => {
  const index = users.findIndex((user) => id === user.user_id);
  // create new object and combine properties/values of two objects inside it
  users[index] = {...users[index], ...newDetails};
  // palauttaa true, jos muokkaus onnistui
  return index !== -1;
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.user_id === id);
  users.splice(index, 1);
  return index !== -1;
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
