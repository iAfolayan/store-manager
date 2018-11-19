import cuid from 'cuid';
import client from '../db/index';
import helper from '../utils';

/**
 * @description - Fetch all available categories
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns {data} - Return all categories
 */
const getCategories = (req, res) => {
  client.query('SELECT * FROM categories ORDER BY catname', (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error', 'danger');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'No Category found', 'danger');
    return helper.sendMessage(res, 200, 'Record retrieved successfully', data.rows);
  });
};

/**
 * @description createCategory - Create a new category
 * @param {*} req  - request object
 * @param {*} res - response object
 * @returns {null} - No returns
 */
const createCategory = (req, res) => {
  const query = 'INSERT INTO categories(catid, catname) VALUES($1, $2) RETURNING *';
  const { catid = cuid(), catname } = req.body;

  if (catname.trim() === '') return helper.sendMessage(res, 400, 'Invalid input', 'danger');
  if (catname === '') return helper.sendMessage(res, 400, 'Category field cannot be empty');
  if (catname.toString().match(/^[0-9]+$/)) return helper.sendMessage(res, 400, 'Only string allowed', 'danger');

  const values = [catid, catname];

  client.query(query, values, (err, data) => {
    if (err) return helper.sendMessage(res, 500, 'Internal Server Error', 'danger');

    return helper.sendMessage(res, 201, 'Category Added successful', data.rows[0]);
  });
};

/**
 * @description - Update product
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns {data} - Return data
 */
const editCategory = (req, res) => {
  const { categoryId } = req.params;
  const {
    catname
  } = req.body;

  const query = `UPDATE categories SET catname='${catname}' WHERE catid = '${categoryId}' RETURNING *`;

  client.query(query, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error', 'danger');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Unable to update category', 'danger');
    return helper.sendMessage(res, 200, 'category updated successful', data.rows[0]);
  });
};

/**
 * @description - Delete category
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns {null} - no response
 */
const deleteACategory = (req, res) => {
  const { categoryId } = req.params;
  client.query(`DELETE FROM categories WHERE catid='${categoryId}'`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Category not found');
    return helper.sendMessage(res, 200, 'Category deleted successfully');
  });
};
export default {
  getCategories,
  editCategory,
  createCategory,
  deleteACategory
};
