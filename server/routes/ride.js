import express from 'express';
import { createOffer, getRestaurant, getRestaurantInfo, getTaxiInfo, makeRating } from '../controllers/rideController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createoffer', auth, createOffer);
router.get('/:id', getTaxiInfo);
router.patch('/rating/:id', auth, makeRating);
router.get('/restaurants', getRestaurantInfo);
router.get('/restaurant', getRestaurant);

export default router; 
