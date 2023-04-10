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
        type: {
            type: String,
            required: true,
            default: "Point",
        },
        address: { type: String },
        coordinates: [Number],
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
    },
    location: {
        type: {
            type: String,
            required: true,
            default: "Point",
        },
        address: { type: String },
        coordinates: [Number],
    }
})

rideInformationSchema.index({ "location": "2dsphere" })

const RideInformation = mongoose.model('RideInformation', rideInformationSchema);

export default RideInformation;