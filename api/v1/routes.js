import express from 'express';
import multer from 'multer';
import Product from './controller/product';
import Sale from './controller/sales';
import User from './controller/user';

const upload = multer({ dest: './uploads' });

const router = express.Router();

router.get('/api/v1/', (req, res) => res.status(200).json({
  msg: 'Welcome to Store Manager 1.0'
}));

router.get('/api/v1/products', Product.getAll);

router.get('/api/v1/products/:id', Product.getOne);

router.post('/api/v1/products', upload.single('prdImage'), Product.addProduct);

router.patch('/api/v1/products/:id', Product.updateOne);

router.delete('/api/v1/products/:id', Product.deleteProduct);

router.get('/api/v1/sales', Sale.getAll);

router.post('/api/v1/sales', Sale.addSale);

router.get('/api/v1/sales/:saleId', Sale.getOne);

// router.get('/api/v1/sales/:id', Sale.getOne);

router.get('/api/v1/sales/seller/:sid', Sale.getUserSales);

router.get('/users', User.getAllUser);

router.post('/api/v1/users', User.createUser);

router.post('/api/v1/user', User.userLogin);

router.post('/api/v1/user/reset', User.resetPassword);

export default router;
