import express from 'express';
import productcontroller from '../controllers/product.controller';

const router = express.Router();

router.route('/')
  .get(productcontroller.getProducts)
  .post(productcontroller.createProduct);

router.route('/:productId')
  .get(productcontroller.getOneProduct)
  .delete(productcontroller.deleteAProduct)
  .put(productcontroller.updateAProduct);
export default router;
