import availableProducts from '../data/products';

/**
 * @class ProductCtrl
 * @classdesc manages products
 */
class ProductCtrl {
  /**
   * @description retrieves all products
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {products} - all available products
   */
  static getAll(req, res) {
    res.status(200)
      .json({
        msg: 'products successfully retrieved',
        data: availableProducts
      });
  }

  /**
   * @description retrieve a single product
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {product} - Product detail
   */
  static getOne(req, res) {
    const { id } = req.params;
    const product = availableProducts.find(prd => prd.id === parseInt(id, 10));
    if (product) {
      return res.status(200).send({
        msg: 'product successfully found',
        data: product
      });
    }
    res.status(404).send({ msg: 'product not found' });
  }

  /**
   * @description - Update a product
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {null} - no returns
   */
  static updateOne(req, res) {
    const { id } = req.params;
    const keys = Object.keys(req.body);
    const product = availableProducts.find(prd => prd.id === parseInt(id, 10));
    const productIndex = availableProducts.findIndex(p => p.id === parseInt(id, 10));
    if (product) {
      keys.forEach((key) => {
        product[key] = req.body[key];
      });
      availableProducts[productIndex] = product;
      res.status(200).send({
        msg: 'Product successfully updated',
        data: product
      });
    } else {
      res.status(404).json({
        msg: 'Product not found',
      });
    }
  }

  /**
   * @description - Create a new product
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {product} - Product
   */
  static addProduct(req, res) {
    const {
      id, name, price, description, minimumAllowed, image, category
    } = req.body;
    const newProduct = {
      id, name, price, description, minimumAllowed, image, category
    };
    availableProducts.push(newProduct);
    res.status(201).json({
      msg: 'A new product was successfully created',
      data: newProduct
    });
  }

  /**
   * @description - Remove product from cart
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {null} - no returns
   */
  static removeOne(req, res) {
    const { id } = req.params;
    res.status(200).json({
      msg: 'Product deleted',
      id
    });
  }

  /**
   * @description - Delete an existing product
   * @param {*} req - request object
   * @param {*} res - response object
   * @returns {nulll} - no returns
   */
  static deleteProduct(req, res) {
    const { id } = req.params;
    const product = availableProducts.find(prd => prd.id === parseInt(id, 10));
    if (product) {
      availableProducts.pop(product.id);
      res.status(200).json({
        msg: 'Product Deleted'
      });
    } else {
      res.status(404).send({
        msg: 'Product not found'
      });
    }
  }
}

export default ProductCtrl;
