import express from 'express';
import multer from 'multer';
import UserController from '../controllers/users.controller';
import middleware from '../controllers/middleware.controller';

const upload = multer({ dest: './uploads/' });


const router = express.Router();

router.post('/login', UserController.login);

router.post('/signup', upload.single('useravatar'), middleware.isUserAuthorized, middleware.isUserAdmin, UserController.createUser);

router.get('/users', middleware.isUserAuthorized, middleware.isUserAdmin, UserController.getAllUsers);

router.post('/resetpassword', UserController.resetpassword);

export default router;
/* M#EpCgk9xX */
