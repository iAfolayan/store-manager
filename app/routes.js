import express from 'express';
import ProductCtrl from './controller/product';
import SaleRecords from './controller/sales';


const router = express.Router();

router.get('/', (req, res) => res.status(200).json({msg: 'Welcome to Store Manager 1.0' }));

router.get('/products', ProductCtrl.getAll);

router.get('/products/:id', ProductCtrl.getOne);

router.post('/products', ProductCtrl.addProduct);

router.patch('/products/:id', ProductCtrl.updateOne);

router.delete('/products/:id', ProductCtrl.deleteProduct);

router.delete('/checkout/:id', ProductCtrl.removeOne);

router.get('/sales', SaleRecords.getAll);

router.post('/sales', SaleRecords.addSale);

router.get('/sales/:saleId', SaleRecords.getOne);

router.get('/sales/:id', SaleRecords.getOne);

router.get('/sales/seller/:sid', SaleRecords.getUserSales);

export default router;
