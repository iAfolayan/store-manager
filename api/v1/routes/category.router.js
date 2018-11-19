import express from 'express';
import categoryController from '../controllers/category.controller';
import middleware from '../controllers/middleware.controller';
import Validation from '../controllers/Validation';

const router = express.Router();

router.route('/')
  .get(middleware.isUserAuthorized, categoryController.getCategories)

  .post(
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    categoryController.createCategory
  );

router.route('/:categoryId')
  .put(Validation.checkParamValid('categoryId'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    categoryController.editCategory)
    
  .delete(Validation.checkParamValid('categoryId'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    categoryController.deleteACategory);

export default router;
