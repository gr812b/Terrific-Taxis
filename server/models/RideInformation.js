import mongoose from 'mongoose';

const rideInformationSchema = mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    riders: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
        ref: "User",
    },
    numRiders: {
        type: Number,
        required: true
    },
    stops: {
        type: [String],
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    selectedRestaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
    },
    carInformation: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    isOffering: {
        type: Boolean,
        required: true
    }
})

const RideInformation = mongoose.model('RideInformation', rideInformationSchema);

export default RideInformation;