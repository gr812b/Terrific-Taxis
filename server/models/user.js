import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
    },
    name: {
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
    }
})

const User = mongoose.model('User', userSchema);

export default User;