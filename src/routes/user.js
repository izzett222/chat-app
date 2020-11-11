import express from 'express';
import { validateSignup, validateLogin } from '../validation/userValidate';
import {
  signupController, loginController, profileController,
} from '../controllers/userController';
import protect from '../middleware/protectRoute';

const router = express.Router();
router.post('/signup', validateSignup, signupController);
router.post('/login', validateLogin, loginController);
router.get('/profile', protect, profileController);
export default router;
