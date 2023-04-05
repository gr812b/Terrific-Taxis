import mongoose from 'mongoose';

const menuItemSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;