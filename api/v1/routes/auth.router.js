import express from 'express';
import multer from 'multer';
import UserController from '../controllers/users.controller';
import middleware from '../controllers/middleware.controller';
import Validation from '../controllers/Validation';

const upload = multer({ dest: './uploads/' });


const router = express.Router();

router.post('/login', UserController.login);

router.post('/signup', upload.single('useravatar'),
  middleware.isUserAuthorized,
  middleware.isUserAdmin,
  UserController.createUser);

router.get('/users', middleware.isUserAuthorized,
  middleware.isUserAdmin,
  UserController.getAllUsers);

router.route('/users/:userId')
  .put(Validation.checkParamValid('userId'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    UserController.makeUserAnAdmin)

  .get(Validation.checkParamValid('userId'),
    middleware.isUserAuthorized,
    UserController.getAUser)

  .patch(Validation.checkParamValid('userId'),
    middleware.isUserAuthorized,
    middleware.isUserAdmin,
    UserController.disabledUserAcoount);

router.post('/reset', UserController.resetpassword);

export default router;
