import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  return rows[0];
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  // console.log('user', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findCatsByUserId = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [id]
  );
  // console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows;
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  console.log(params);
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const modifyUser = async (id, user, modifiedUser) => {
  let sql;

  if (user.role === 'admin' || id === user.user_id) {
    sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
      modifiedUser,
      id,
    ]);
  }

  if (sql) {
    const [result] = await promisePool.execute(sql);

    return result.affectedRows > 0;
  }

  return false;
};

const removeUser = async (id, user) => {
  let catRows;
  let userRows;

  if (user.role === 'admin' || id === user.user_id) {
    [catRows] = await promisePool.execute(
      'DELETE FROM wsk_cats WHERE owner = ?',
      [id]
    );
    [userRows] = await promisePool.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );
  }

  console.log('userrows', userRows, ' catrows', catRows);

  return userRows.affectedRows > 0;
};

export {
  listAllUsers,
  findUserByUsername,
  findUserById,
  findCatsByUserId,
  addUser,
  modifyUser,
  removeUser,
};
