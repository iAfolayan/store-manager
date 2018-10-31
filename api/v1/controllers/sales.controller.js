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

export default getAllSales;
