import client from '../db/index';
import helper from '../utils';

/**
 * @description - Fetch all available products
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns {data} - Return all products
 */
const getProducts = (req, res) => {
  client.query('SELECT * FROM products', (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'No product found');
    return helper.sendMessage(res, 200, 'Record retrieved successfully', data.rows);
  });
};

/**
 * @description - Get a single product
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns {data} - Returns product detail
 */
const getOneProduct = (req, res) => {
  const { productId } = req.params;
  client.query(`SELECT * FROM products WHERE id=${productId}`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Product not found');
    return helper.sendMessage(res, 200, 'Record retrieved successfully', data.rows[0]);
  });
};

export default {
  getProducts, getOneProduct
};
