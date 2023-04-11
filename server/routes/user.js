import express from 'express';
import { signUp, signIn, editProfile, addFriend, removeFriend, getProfile, getOwnProfile } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);
router.patch('/', auth, editProfile);
router.patch('/addfriend', auth, addFriend);
router.patch('/removefriend', auth, removeFriend);
router.get('/getprofile', auth, getProfile);
router.get('/getownprofile', auth, getOwnProfile);

export default router;  