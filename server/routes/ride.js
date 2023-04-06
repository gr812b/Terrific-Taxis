import express from 'express';
import { createOffer, getTaxiInfo } from '../controllers/rideController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createoffer', auth, createOffer);
router.get('/:id', getTaxiInfo);

export default router;  