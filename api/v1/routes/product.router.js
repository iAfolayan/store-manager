import express from 'express';
import productcontroller from '../controllers/product.controller';

const router = express.Router();

router.route('/')
  .get(productcontroller.getProducts);

export default router;
