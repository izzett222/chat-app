import express from 'express';
import { validateSignup, validateLogin } from '../validation/userValidate';
import { signupController, loginController } from '../controllers/userController';

const router = express.Router();
router.post('/signup', validateSignup, signupController);
router.post('/login', validateLogin, loginController);

export default router;
