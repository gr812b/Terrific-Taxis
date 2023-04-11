import User from '../models/user.js'
import Request from '../models/Request.js';
import RideInformation from '../models/RideInformation.js';
import CarInformation from '../models/carInformation.js';

// this route is /dispatcher/request. POST this route
// expected req body {destination, location, distance}
function intersect(o1, o2) {
    return Object.keys(o1).filter(k => Object.hasOwn(o2, k))
}
export const requestRides = async (req, res) => {
    try {
        const requestingUser = User.findById(req.userId);
        const reqLat = req.body.destination.latitude;
        const reqLng = req.body.destination.longitude;
        const lat = req.body.location.latitude;
        const lng = req.body.location.longitude;
        const location = [lat, lng];
        const destination = [reqLat, reqLng];
        const distance = req.body.distance

        const ridesNearLocation = await RideInformation.find({
            isOffering: true, location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: location
                    },
                    $maxDistance: distance
                }
            }
        }).populate('carInformation', 'numberOfSeats')
        /*
        const ridesNearDestination = await RideInformation.find({
            isOffering: true, destination: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: destination
                    },
                    $maxDistance: 100
                }
            }
        }).populate('carInformation', 'numberOfSeats')
        */
        //intersect(ridesNearDestination, ridesNearLocation);


        // $where('this.numRiders < this.carInformation.numberOfSeats');
        console.log(ridesNearLocation);
        if (ridesNearLocation) {
            res.status(200).json(ridesNearLocation);
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
        res.status(500).json({ message: error.message })
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

