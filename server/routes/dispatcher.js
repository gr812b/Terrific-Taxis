import express from 'express'
import auth from '../middleware/auth.js'
import { acceptRequest, getAcceptance, getMatches, requestRides, selectRide } from '../controllers/dispatcherController.js';

const router = express.Router();

router.post('/request', requestRides);
router.post('/select', auth, selectRide);
router.get('/matches', auth, getMatches);
router.post('/accept', auth, acceptRequest);
router.get('/acceptance', auth, getAcceptance);

export default router;