import RideInformation from "../models/RideInformation";

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