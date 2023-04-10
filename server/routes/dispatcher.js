import express from 'express'
import auth from '../middleware/auth.js'
import { acceptRequest, getAcceptance, getRequests, requestRides, selectRide } from '../controllers/dispatcherController';

const router = express.Router();

router.post('/request', auth, requestRides);
router.post('/select', auth, selectRide);
router.get('/requests', auth, getRequests);
router.post('/accept', auth, acceptRequest);
router.get('/acceptance', auth, getAcceptance);

export default router;