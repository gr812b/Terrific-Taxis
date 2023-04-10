import mongoose from 'mongoose'

const requestSchema = mongoose.Schema({
    offeringUser: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: "User",
        required: true,
    },
    requestingUser: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: "User",
        required: true,
    },
    ride: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: "RideInformation",
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    accepted: {
        type: Boolean,
        required: true,
    }
})

const Request = mongoose.model('Request', requestSchema);

export default Request;