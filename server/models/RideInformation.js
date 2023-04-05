import mongoose from 'mongoose';

const rideInformationSchema = mongoose.Schema({
    riders: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: "User"
    },
    stops: {
        type: [String],
        required: true,
    },
    selectedRestaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
    },
    carInformation: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
})

const RideInformation = mongoose.model('RideInformation', rideInformationSchema);

export default RideInformation;