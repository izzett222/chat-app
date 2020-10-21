import express from 'express';
import validateSignup from '../validation/signupValidate';
import signupController from '../controllers/userController';

const router = express.Router();
router.post('/signup', validateSignup, signupController);

export default router;
