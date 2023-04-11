import Restaurant from "../models/Restaurant.js";
import RideInformation from "../models/RideInformation.js";
import CarInformation from "../models/carInformation.js";
import User from "../models/user.js";

//route is /rides/:id of taxi. GET this route.
export const getTaxiInfo = async (req, res) => {
    try {
        const taxiId = req.params.id;
        const taxi = await CarInformation.findById(taxiId);
        console.log(taxi)
        if (!taxi) {
            return res.status(404).send("Invalid code")
        }
        res.status(200).json(taxi);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}
//route is /rides/createoffer. POST this route.
//expected req body {taxiId, destination, location}
export const createOffer = async (req, res) => {
    try {
        console.log(req.body)
        const userId = req.userId;
        const { taxiInfo, destination, location, locationAddress, destinationAddress, offeringSocket, price } = req.body;
        const destinationCoor = [destination.latitude, destination.longitude]
        const locationCoor = [location.latitude, location.longitude]
        const offer = await RideInformation.create({
            carInformation: taxiInfo._id,
            creator: userId,
            destination: { type: "Point", address: destinationAddress, coordinates: destinationCoor },
            isOffering: true,
            location: { type: "Point", address: locationAddress, coordinates: locationCoor },
            stops: [],
            numRiders: taxiInfo.numberOfSeats,
            offeringSocket: offeringSocket,
            price: price,
        });
        res.status(201).json(offer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getOffer = async (req, res) => {
    const rideId = req.params.id;
    try {
        const offer = await RideInformation.findById(rideId).populate('riders');
        res.status(200).json(offer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
//route is /rides/restaurants. GET this route THIS RETURNS ALL RESTAURANT INFO
//expected req body {restaurantId }
export const getRestaurantInfo = async (req, res) => {
    try {
        //const restaurantId = req.restaurantId;
        const info = await Restaurant.find().populate("menuItem");
        res.status(200).json(info);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
//route is /rides/restaurant. GET THIS route. RETURNS A SINGLE RESTAURANT INFO with the given id
//expected query string is ?restaurant=restaurantid
export const getRestaurant = async (req, res) => {
    try {
        const restaurant = req.query.restaurant;
        const info = await Restaurant.findById(restaurant).populate("menuItem");
        res.status(200).json(info);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }

}

//route is /rides/rating/id of the other person. PATCH this route
//expected req body {rating:}
export const makeRating = async (req, res) => {
    console.log("rating")
    try {
        const rating = req.body.rating;
        const otherUserId = req.params.id;
        const otherUser = await User.findById(otherUserId);
        console.log(rating)
        otherUser.rating.push(rating);
        const updatedUser = await User.findByIdAndUpdate(otherUserId, { ...otherUser, otherUserId }, { new: true });
        res.status(201).send("Rating recorded sucessfuly");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

