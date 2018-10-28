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

/**
 * @description - Delete product
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns {null} - no response
 */
const deleteAProduct = (req, res) => {
  const { productId } = req.params;
  client.query(`DELETE FROM products WHERE id=${productId}`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Product not found');
    return helper.sendMessage(res, 200, 'Product deleted');
  });
};

/**
 * @description - Create a product
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns {data} - Return the created product
 */
const createProduct = (req, res) => {
  const createdon = new Date().toISOString();
  const query = 'INSERT INTO products(productname, price, quantity, description, category, minimumallowed, image, createdon) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
  const {
    productname,
    price,
    quantity,
    description,
    category,
    minimumallowed,
    image,
  } = req.body;

  const values = [productname, price, quantity, description, category, minimumallowed, image, createdon];
  client.query(query, values, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Unable to create product');
    return helper.sendMessage(res, 201, 'Product created successful', data.rows[0]);
  });
};

/**
 * @description - Update product
 * @param {*} req - request object
 * @param {*} res - response object
 * @returns {data} - Return data
 */
const updateAProduct = (req, res) => {
  const { productId } = req.params;
  const {
    productname,
    price,
    quantity,
    description,
    category,
    minimumallowed,
    image,
  } = req.body;

  const query = `UPDATE products SET productname='${productname}', price=${price}, quantity=${quantity}, description='${description}', category='${category}', minimumallowed=${minimumallowed}, image='${image}' WHERE id = ${productId} RETURNING *`;
  client.query(query, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Unable to update product');
    return helper.sendMessage(res, 200, 'Product updated successful', data.rows[0]);
  });
};

export default {
  getProducts, getOneProduct, deleteAProduct, createProduct, updateAProduct
};
