import User from "../models/user.js";
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    const { username, password, phone, email, address, city, state, zip } = req.body;
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
            province: state,
            city: city,
            zip: zip,
        })
        res.status(201).json({ result: result, message: "User sucessfully created" })
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong during user creation");
    }
}

export const signIn = async (req, res) => {
    const { username, password } = req.body
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!passwordCorrect) {
            return res.status(400).json({ message: "Username/Password incorrect" });
        }
        res.status(200).json(existingUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }

}