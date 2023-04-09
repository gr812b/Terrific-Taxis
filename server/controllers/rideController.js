import Restaurant from "../models/Restaurant.js";
import RideInformation from "../models/RideInformation.js";
import CarInformation from "../models/carInformation.js";
import User from "../models/user.js";

//route is /rides/:id of taxi. GET this route.
export const getTaxiInfo = async (req, res) => {
    try {
        const taxiId = req.params.id;
        const taxi = await CarInformation.findById(taxiId);
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
//expected req body {taxiId, destination}
export const createOffer = async (req, res) => {
    try {
        const userId = req.userId;
        const { taxiId, destination } = req.body;
        const offer = await RideInformation.create({ carInformation: taxiId, creator: userId, destination: destination, isOffering: true });
        res.status(201).json(offer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
//route is /rides/restaurant. GET this route
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
//route is /rides/rating/id of the other person. PATCH this route
//expected req body {rating:}
export const makeRating = async (req, res) => {
    try {
        const rating = req.rating;
        const otherUserId = req.params.id;
        const otherUser = await User.findById(otherUserId);
        otherUser.rating.push(Number(rating));
        res.status(201).send("Rating recorded sucessfuly");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

