import client from '../db/index';
import helper from '../utils';

/**
   * @description  retrives all sale records
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {salesrecords} - Sales Records
   */
const getAllSales = (req, res) => {
  client.query('SELECT *, (sales_item.quantity * sales_item.price) AS total_amount FROM sales INNER JOIN sales_item ON (sales.id = sales_item.salesid) INNER JOIN products ON (sales_item.productid = products.id)', (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (data.rowCount === 0) return helper.sendMessage(res, 404, 'No sales found');
    return helper.sendMessage(res, 200, 'Record retrieved successfully', data.rows);
  });
};

/**
   * @description  Add items to database
   * @param {*} items - request object
   * @param {*} salesid - response object
   * @returns {null} - No return
   */
const insertItems = (items, salesid) => {
  const insertPromises = items.map(eachItem => new Promise((resolve, reject) => {
    client.query(`INSERT INTO sales_item (salesid, productid, quantity, price) VALUES(${salesid}, ${eachItem.productid}, ${eachItem.quantity}, ${eachItem.price})`, (err, data) => ((err) ? reject(err) : resolve()));
  }));

  return insertPromises;
};

/**
     * @description  Create sale records
     * @param {*} req - request object
     * @param {*} res - response object
     * @returns {salesrecords} - Create Sales
     */
const createSalesRecord = (req, res) => {
  const {
    buyername, buyeremail, buyeraddress, buyerphone, items
  } = req.body;
  const userid = req.decoded.id;

  // Form validation
  req.checkBody('buyername', 'Buyer name field is required').notEmpty();
  req.checkBody('buyeremail', 'Buyer Email field is required').isEmail();
  req.checkBody('buyeraddress', 'Buyer Address field is required').notEmpty();
  req.checkBody('buyerphone', 'Buyer Phone address field is required').notEmpty();
  req.checkBody('buyerphone', 'Incomplete Phone Number must be minimum of 11 characters').isLength({ min: 11 });

  // check Errors
  const errors = req.validationErrors();

  if (errors) {
    return helper.sendMessage(res, 404, errors[0].msg);
  }

  const query = `INSERT INTO sales(buyername, buyeremail, buyeraddress, buyerphone, attendantid) VALUES('${buyername}', '${buyeremail}', '${buyeraddress}', '${buyerphone}', '${userid}') RETURNING *`;
  client.query(query, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    const salesid = data.rows[0].id;

    /* Insert the item */
    Promise.all(insertItems(items, salesid))
      .then(() => helper.sendMessage(res, 201, 'Sales Record was successfully created'))
      .catch(() => {
        helper.sendMessage(res, 400, 'Item not Inserted');
      });
  });
};

/**
 * @description - Get single sale record for both Amdmin and a sale attendant
 * @param {*} req - request Object
 * @param {*} res - response Object
 * @returns {data} - Returns Single data
 */
const getOneSaleRecord = (req, res) => {
  let query = `SELECT * FROM sales INNER JOIN sales_item ON (sales.id = sales_item.salesid) INNER JOIN products ON (sales_item.productid = products.id) WHERE sales.id = ${req.params.salesid}`;
  if (req.decoded.role === 2) {
    query += ` AND attendantid = ${req.decoded.id}`;
  }

  client.query(query, (err, data) => {
    if (err) {
      return helper.sendMessage(res, 500, 'Internal server error');
    }
    if (err) return helper.sendMessage(res, 404, 'Record not found');
    return helper.sendMessage(res, 200, 'Record found successfully', data.rows[0]);
  });
};

export default {
  getAllSales, createSalesRecord, getOneSaleRecord
};
