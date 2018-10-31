import express from 'express';
import getAllSales from '../controllers/sales.controller';
import middleware from '../controllers/middleware.controller';

const router = express.Router();

router.route('/')
  .get(middleware.isUserAuthorized, middleware.isUserAdmin, getAllSales);

export default router;
