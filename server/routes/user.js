import express from 'express';
import { signUp, signIn, editProfile, addFriend } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.patch('/', auth, editProfile);
router.patch('/addfriend', auth, addFriend);

export default router;  