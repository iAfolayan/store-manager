import express from 'express';
import UserController from '../controllers/users.controller';
import middleware from '../controllers/middleware.controller';

const router = express.Router();

router.post('/login', UserController.login);

router.post('/signup', middleware.isUserAuthorized, middleware.isUserAdmin, UserController.createUser);

export default router;
