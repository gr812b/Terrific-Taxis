import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//this route is /users/signup. POST this route
//expected req body { username, password, phone, email, address, city, state, zip }
export const signUp = async (req, res) => {
    const { username, password, phone, email, address, city, state, zip } = req.body;
    console.log(req.body)
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json("User Already exists");
        }
        //12 salt rounds around 3 hashes/sec
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({
            username: username,
            password: hashedPassword,
            phoneNumber: phone,
            email: email,
            address: address,
            province: state,
            city: city,
            zip: zip,
        })
        res.status(201).json({ result: result, message: "User sucessfully created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
//this route is /users/signin. POST this route
//expected req body {username, password}
export const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(400).json({ message: "Username/Password incorrect" });
        }
        const token = jwt.sign(
            { username: username, id: existingUser._id },
            "test",
            { expiresIn: "1h" }
        );
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//this route is /users. PATCH this route
//expected req body { username, password, phone, email, address, city, state, zip }
export const editProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const formData = req.body;
        const updatedProfile = await User.findByIdAndUpdate(userId, { ...formData, _id: userId }, { new: true });
        res.status(201).json(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const addFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;
        const profile = await User.findById(userId);
        const index = profile.friends.findIndex((id) => String(id) === String(friendId));
        if (index === -1) {
            console.log(String(friendId));
            //friend thsis person
            profile.friends.push(friendId)
        } else {
            //unfriend this person
            console.log("123")
            profile.friends = profile.friends.filter((id) => String(id) !== String(friendId))
        }
        const updatedProfile = await User.findByIdAndUpdate(userId, profile, { new: true })
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}