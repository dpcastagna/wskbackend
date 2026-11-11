// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  // console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addCat = async (cat, user) => {
  let sql;
  let params;

  console.log('addCat', cat, user);
  const {cat_name, weight, owner, filename, birthdate} = cat;

  if (user.role === 'admin' || user.role === 'user') {
    sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
    params = [cat_name, weight, user.user_id, filename, birthdate];
  } else {
    return false;
  }

  const [result] = await promisePool.execute(sql, params);

  if (result.affectedRows === 0) {
    return false;
  }

  return {cat_id: result.insertId};
};

const modifyCat = async (id, cat, user) => {
  let sql;

  if (user.role === 'admin') {
    sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [
      cat,
      id,
    ]);
  } else {
    sql = promisePool.format(
      `UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?`,
      [cat, id, user.user_id]
    );
  }

  const [result] = await promisePool.execute(sql);

  return result.affectedRows > 0;
};

const removeCat = async (id, user) => {
  let sql;
  let params;

  if (user.role === 'admin') {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ?';
    params = [id];
  } else {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?';
    params = [id, user.user_id];
  }

  const [result] = await promisePool.execute(sql, params);

  return result.affectedRows > 0;
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat};
