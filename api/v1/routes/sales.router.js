import express from 'express';
import salescontroller from '../controllers/sales.controller';
import middleware from '../controllers/middleware.controller';
import Validation from '../controllers/Validation';

const router = express.Router();

router.route('/')
  .get(middleware.isUserAuthorized, middleware.isUserAdmin, salescontroller.getAllSales)
  .post(middleware.isUserAuthorized, salescontroller.createSalesRecord);

router.route('/:salesid')
  .get(Validation.checkParamValid('salesid'), middleware.isUserAuthorized, salescontroller.getOneSaleRecord);

export default router;
