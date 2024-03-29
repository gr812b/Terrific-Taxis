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
        ref: "Restaurant"
    },
    carInformation: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "CarInformation"
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
    },
    offeringSocket: {
        type: String,
        required: true,
    },
    riderSockets: {
        type: [String],
        required: true,
        default: [],
    },
    price: {
        type: Number,
        required: true,
    }
})

rideInformationSchema.index({ "location": "2dsphere" })
rideInformationSchema.index({ "destination": "2dsphere" })

const RideInformation = mongoose.model('RideInformation', rideInformationSchema);

export default RideInformation;