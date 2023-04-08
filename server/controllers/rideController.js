import RideInformation from "../models/RideInformation.js";
import CarInformation from "../models/carInformation.js";

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
