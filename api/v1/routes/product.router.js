import express from 'express';
import productcontroller from '../controllers/product.controller';

const router = express.Router();

router.route('/')
  .get(productcontroller.getProducts);

router.route('/:productId')
  .get(productcontroller.getOneProduct)
  .delete(productcontroller.deleteAProduct);

export default router;
