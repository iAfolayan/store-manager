import express from 'express';
import productcontroller from '../controllers/product.controller';
import middleware from '../controllers/middleware.controller';

const router = express.Router();

router.route('/')
  .get(productcontroller.getProducts)
  .post(middleware.isUserAdmin, productcontroller.createProduct);

router.route('/:productId')
  .get(productcontroller.getOneProduct)
  .delete(middleware.isUserAdmin, productcontroller.deleteAProduct)
  .put(middleware.isUserAdmin, productcontroller.updateAProduct);
export default router;
