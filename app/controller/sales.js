import salesRecords from '../data/sales';

/**
 * @class SalesRecordCtrl
 * @classdesc - Manages sales record
 */
class SalesRecordCtrl {
  /**
   * @description  retrives all sale records
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {salesrecords} - Sales Records
   */
  static getAll(req, res) {
    res.status(200)
      .json({
        msg: 'Sale records successfully retrieved',
        data: salesRecords
      });
  }

  /**
   * @description retrieves a single user sales record
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {sales} - users sales
   */
  static getOne(req, res) {
    const { saleId } = req.params;
    const sales = salesRecords.find(sale => sale.id === parseInt(saleId, 10));
    if (sales) {
      return res.status(200).json({
        msg: 'Sale record retrived successfully',
        data: sales
      });
    }
    res.status(404).json({
      msg: 'No sale record found'
    });
  }

  /**
   * @description retrieves all user sale records
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {sales} - user sale records
   */
  static getUserSales(req, res) {
    const { sid } = req.params;
    const sales = salesRecords.filter(sale => sale.sellerId === sid);
    if (sales) {
      return res.status(200).json({
        msg: 'Sale records successfully retrieved',
        data: sales
      });
    }
    res.status(404).json({
      msg: 'No data found'
    });
  }
}

export default SalesRecordCtrl;
