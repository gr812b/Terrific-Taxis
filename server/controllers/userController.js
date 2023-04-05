import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    const { username, password, phone, email, address, province, zip } = req.body;
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json("User Already exists");
        }
        //12 salt rounds around 3 hashes/sec
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({
            username: username,
            password: hashedPassword,
            phoneNumber: phone,
            email: email,
            address: address,
            province: province,
            zip: zip,
        })
        res.status(201).json({ result: result, message: "User sucessfully created" })
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong during user creation");
    }
}