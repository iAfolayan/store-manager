import express from 'express';
import multer from 'multer';
import productcontroller from '../controllers/product.controller';
import middleware from '../controllers/middleware.controller';

const upload = multer({ dest: './uploads/products' });

const router = express.Router();

router.route('/')
  .get(middleware.isUserAuthorized, productcontroller.getProducts)
  .post(upload.single('productimage'), middleware.isUserAuthorized, middleware.isUserAdmin, productcontroller.createProduct);

router.route('/:productId')
  .get(middleware.isUserAuthorized, middleware.isUserAdmin, productcontroller.getOneProduct)
  .delete(middleware.isUserAuthorized, middleware.isUserAdmin, productcontroller.deleteAProduct)
  .put(middleware.isUserAuthorized, middleware.isUserAdmin, productcontroller.updateAProduct);

export default router;
