import express from 'express';
import { createOffer, getOffer, getRestaurant, getRestaurantInfo, getTaxiInfo, makeRating } from '../controllers/rideController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/createoffer', auth, createOffer);
router.get('/restaurants', getRestaurantInfo);
router.get('/taxi/:id', getTaxiInfo);
router.get('/restaurant', getRestaurant);
router.get('/taxi/:id', getTaxiInfo);
router.patch('/rating/:id', auth, makeRating);
router.get('/getride/:id', getOffer);

export default router; 
