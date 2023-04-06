import mongoose from 'mongoose';
import express from 'express';
import userRoutes from './routes/user.js';
import rideRoutes from './routes/ride.js';
import bodyParser from 'body-parser';
const app = express();
const port = 5000;


const URL = "mongodb+srv://taxiterrific:OSKTJAwcpiOopp7C@terrifictaxi.mkbjg5p.mongodb.net/?retryWrites=true&w=majority"

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/users', userRoutes);
app.use('/rides', rideRoutes);


app.get('/', (req, res) => {
  res.send('This is a test of the terrific taxi server');
})

mongoose.set('strictQuery', false)
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => { app.listen(port, () => console.log(`Server running on port ${port}`)) }).catch((error) => { console.log(error.message) });