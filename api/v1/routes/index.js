import express from 'express';
import productRoutes from './product.router';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to Store Manager 1.0'
  });
});

router.use('/products', productRoutes);

export default router;
