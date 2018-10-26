import express from 'express';
import productRoutes from './product.router';
import authRoutes from './auth.router';
import middleware from '../controllers/middleware.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to Store Manager 1.0'
  });
});

router.use('/products', middleware.isUserAuthorized, productRoutes);

router.use('/auth', authRoutes);

export default router;
