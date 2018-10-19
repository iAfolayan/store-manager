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
        data: product,
        request: {
          type: 'GET',
          url: 'http://localhost:4000/api/v1/products/'
        }
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
        data: product,
        request: {
          type: 'GET',
          url: `http://localhost:4000/api/v1/products/${product.id}`
        }
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

    // Handle Image
    if (req.file) {
      const prdImage = req.file.filename;
    } else {
      const prdImage = 'noImage.jpg';
    }

    // Validate form
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('category', 'Category field is required').notEmpty();
    req.checkBody('price', 'Price field is required').notEmpty();
    req.checkBody('description', 'Description field is required').notEmpty();

    req.checkBody('quantity', 'Password field is required').notEmpty();
    req.checkBody('minimumAllowed', 'Passwords do not match').notEmpty();


    // Check errors
    const errors = req.validationErrors();

    if (errors) {
      res.status(400).json({
        errors
      });
    } else {
      const newProduct = {
        id, name, price, description, minimumAllowed, image, category
      };
      availableProducts.push(newProduct)
      //req.flash('success', 'A new product was successfully created');
      return res.status(201).json({
        msg: 'A new product was successfully created',
        data: newProduct,
        request: {
          type: 'GET',
          url: `http://localhost:4000/api/v1/products/${newProduct.id}`
        }
      });
    }
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
