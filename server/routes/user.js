import express from 'express';
import { signUp, signIn, editProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.patch('/', auth, editProfile);

export default router;  