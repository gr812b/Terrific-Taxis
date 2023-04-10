import User from '..models/user.js'
import Request from '../models/Request';
import RideInformation from '../models/RideInformation';
import CarInformation from '../models/carInformation';

// this route is /dispatcher/request. POST this route
// expected req body {destination, location, distance}
export const requestRides = async (req, res) => {
    try {
        const requestingUser = User.findById(req.userId);
        const reqDestination = req.body.destination;
        const location = req.body.location;
        const distance = req.body.distance

        const rides = await RideInformation.find({
            destination: reqDestination, isOffering: true, location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: location
                    },
                    $maxDistance: distance
                }
            }
        }).
            populate('carInformation', 'numberOfSeats').
            $where('this.numRiders < this.carInformation.numberOfSeats && this.isOffering');

        if (rides) {
            res.status(200).json(rides);
        } else {
            res.status(204).end();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// this route is /dispatcher/select. POST this route
// expected req body is {destination, ride}, where ride is the ride's _id
// if succesful returns {requestId}
export const selectRide = async (req, res) => {
    try {
        const reqDestination = req.body.destination;
        const reqRide = req.body.ride;

        const ride = await RideInformation.findById(reqRide._id);
        if (ride.isOffering && reqDestination == ride.destination) {
            const rideRequest = await Request.create({
                offeringUser: reqRide.creator,
                requestingUser: req.userId,
                ride: reqRide._id,
                destination: reqDestination,
                accepted: false
            });
            res.status(201).json({ requestId: rideRequest._id });
        } else {
            res.status(400)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// this route is /dispatcher/requests. GET this route
export const getMatches = async (req, res) => {
    try {
        const requests = await Request.find({ offeringUser: req.userId }).
            populate('requestingUser');

        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// this route is /dispatcher/accept. POST this route
// expected req body is {requestingUser}
export const acceptRequest = async (req, res) => {
    try {
        const reqUser = req.body.requestingUser;
        await Request.updateOne(
            { offeringUser: req.userId, requestingUser: reqUser, accepted: false },
            { $set: { 'accepted': true }, $inc: { 'numRiders': 1 }, $push: { 'riders': reqUser } });
        res.status(200);
    } catch (error) {
        console.log(error)
        res.satus(500).json({ message: error.message })
    }
}

// this route is /dispatcher/acceptance. GET this route
// 
export const getAcceptance = async (req, res) => {
    try {
        const reqUser = req.userId;
        const rideRequest = await Request.findOne({ requestingUser: reqUser });

        res.status(200).json({ accepted: rideRequest.accepted });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


export const findNearestRides = (location, distance) => {
    return RideInformation.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: location
                },
                $maxDistance: distance
            }
        }
    }).exec().catch(error => console.log(error));
}

