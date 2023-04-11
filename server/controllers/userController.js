import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import MenuItem from "../models/MenuItem.js";
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
    //await MenuItem.create({ name: "Tomato", price: "5", image: "tomato image" });
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
        console.log(token)
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
//this route is /users/getprofile. GET this route. This route returns the given userId's profile
// append this query string to end ?userId=whatever user id
export const getProfile = async (req, res) => {
    const userId = req.query.userId;
    try {
        const profile = await User.findById(userId);
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}
//this route is /users/getownprofile. GET this route. This route returns the given userId's profile
export const getOwnProfile = async (req, res) => {
    const userId = req.userId;
    try {
        const profile = await User.findById(userId);
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//this route is /users. PATCH this route
//expected req body { username, password, phone, email, address, city, state, zip }
export const editProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const formData = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const updatedProfile = await User.findByIdAndUpdate(userId, { ...formData, password: hashedPassword, _id: userId }, { new: true });
        res.status(201).json(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
//this route is /users/addfriend. PATCH this route
//expected req body {friendId}
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
        }
        // else {
        //     //unfriend this person
        //     console.log("123")
        //     profile.friends = profile.friends.filter((id) => String(id) !== String(friendId))
        // }
        const updatedProfile = await User.findByIdAndUpdate(userId, profile, { new: true })
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
//this route is /users/removefriend. PATCH this route
//expected req body {friendId}
export const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const userId = req.userId;
        const profile = await User.findById(userId);
        const index = profile.friends.findIndex((id) => String(id) === String(friendId));
        if (index !== -1) {
            //     console.log(String(friendId));
            //     //friend thsis person
            //     profile.friends.push(friendId)
            // } else {
            //     //unfriend this person
            console.log("Removing friend")
            profile.friends = profile.friends.filter((id) => String(id) !== String(friendId))
        }
        const updatedProfile = await User.findByIdAndUpdate(userId, profile, { new: true })
        res.status(200).json(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}