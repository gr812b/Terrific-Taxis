import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    friends: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User",
        required: true,
    },
    rating: {
        type: [Number],
        required: true,
        default: [],
    }
})

const User = mongoose.model('User', userSchema);

export default User;