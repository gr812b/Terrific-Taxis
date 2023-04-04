import express from 'express';
import { signUp } from '../controllers/userController.js';

const router = express.Router();

//router.post('/signin', signin);
router.post('/signup', signUp);

export default router;  