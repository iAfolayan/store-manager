import cuid from 'cuid';
import client from '../db/index';
import helper from '../utils';

/**
 * @description - Fetch all available products
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns {data} - Return all products
 */
const getProducts = (req, res) => {
  client.query('SELECT * FROM products ORDER BY createdon DESC', (err, data) => {
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
  client.query(`SELECT * FROM products WHERE id='${productId}'`, (err, data) => {
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
  client.query(`DELETE FROM products WHERE id='${productId}'`, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Product not found');
    return helper.sendMessage(res, 200, 'Product deleted successfully');
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
  const query = 'INSERT INTO products(id, productname, price, quantity, description, category, minimumallowed, image, createdon) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const {
    id = cuid(),
    productname,
    price,
    quantity,
    description,
    category,
    minimumallowed,
  } = req.body;

  // Form validation
  req.checkBody('productname', 'Product Name field is required').notEmpty();
  req.checkBody('price', 'Product price field is required').notEmpty();
  req.checkBody('price', 'Product price field can only be an integer value').isNumeric();
  req.checkBody('quantity', 'Quantity field is required').notEmpty();
  req.checkBody('quantity', 'Quantity can only be an integer value').isNumeric();
  req.checkBody('description', 'Description field is required').notEmpty();
  req.checkBody('minimumallowed', 'Minimum Allowed field is required').notEmpty();
  req.checkBody('minimumallowed', 'Minimum Allowed can only be an integer value').isNumeric();

  // Validate user pofile image
  let image = '';
  if (req.file) {
    image = req.body.filename;
  } else {
    image = 'defaultImage.jpg';
  }
  if (!price.toString().match(/^[0-9]+$/)) return helper.sendMessage(res, 400, 'Invalid Price, Only integer allowed');

  if (!quantity.toString().match(/^[0-9]+$/)) return helper.sendMessage(res, 400, 'Invalid quantity, Only integer allowed');

  if (!minimumallowed.toString().match(/^[0-9]+$/)) return helper.sendMessage(res, 400, 'Invalid quantity, Only integer allowed');

  if (category === '') return helper.sendMessage(res, 400, 'Category field is required');

  // check Errors
  const errors = req.validationErrors();

  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg);
  }

  const values = [id, productname, price, quantity, description, category,
    minimumallowed, image, createdon];
  client.query(query, values, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal Server Error');
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
  } = req.body;

  // Form validation
  req.checkBody('productname', 'Product Name field is required').notEmpty();
  req.checkBody('price', 'Product price field is required').notEmpty();
  req.checkBody('description', 'Description field is required').notEmpty();
  req.checkBody('minimumallowed', 'Minimum Allowed field is required').notEmpty();
  req.checkBody('quantity', 'Quantity field is required').notEmpty();
  req.checkBody('price', 'Product price field can only be an integer value').isNumeric();
  req.checkBody('quantity', 'Quantity can only be an integer value').isNumeric();
  req.checkBody('minimumallowed', 'Minimum Allowed can only be an integer value').isNumeric();

  // Validate user pofile image
  let image = '';
  if (req.file) {
    image = req.body.filename;
  } else {
    image = 'defaultImage.jpg';
  }

  if (category === '') return helper.sendMessage(res, 400, 'Category field is required', 'danger');

  // check Errors
  const errors = req.validationErrors();

  if (errors) {
    return helper.sendMessage(res, 400, errors[0].msg, 'danger');
  }

  const query = `UPDATE products SET productname='${productname}',
   price=${price}, quantity=${quantity}, description='${description}',
    category='${category}', minimumallowed=${minimumallowed},
     image='${image}' WHERE id = '${productId}' RETURNING *`;

  client.query(query, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error', 'danger');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'Unable to update product', 'danger');
    return helper.sendMessage(res, 200, 'Product updated successful', data.rows[0]);
  });
};

export default {
  getProducts,
  getOneProduct,
  deleteAProduct,
  createProduct,
  updateAProduct
};
