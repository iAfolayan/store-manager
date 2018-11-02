import express from 'express';
import multer from 'multer';
import productcontroller from '../controllers/product.controller';
import middleware from '../controllers/middleware.controller';
import Validation from '../controllers/Validation';

const upload = multer({ dest: './uploads/products' });

const router = express.Router();

router.route('/')
  .get(middleware.isUserAuthorized, productcontroller.getProducts)
  
  .post(upload.single('productimage'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    productcontroller.createProduct);

router.route('/:productId')
  .get(Validation.checkParamValid('productId'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    productcontroller.getOneProduct)

  .delete(Validation.checkParamValid('productId'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    productcontroller.deleteAProduct)

  .put(Validation.checkParamValid('productId'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    productcontroller.updateAProduct);

export default router;
