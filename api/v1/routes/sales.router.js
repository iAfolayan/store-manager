import express from 'express';
import salescontroller from '../controllers/sales.controller';
import middleware from '../controllers/middleware.controller';

const router = express.Router();

router.route('/')
  .get(middleware.isUserAuthorized, middleware.isUserAdmin, salescontroller.getAllSales)
  .post(middleware.isUserAuthorized, salescontroller.createSalesRecord);

router.route('/:salesid')
  .get(middleware.isUserAuthorized, salescontroller.getOneSaleRecord);

export default router;
