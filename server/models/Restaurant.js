import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
    hours: {
        type: [Number],
        required: true,
    },
    menuItem: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;