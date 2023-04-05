import mongoose from 'mongoose';

const carInformationSchema = mongoose.Schema({
    numberOfSeats: {
        type: Number,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    driveName: {
        type: String,
        required: true,
    }
})

const CarInformation = mongoose.model('CarInformation', carInformationSchema);

export default CarInformation;