import User from "../models/user.js";

export const signUp = async (req, res) => {
    console.log(req.body)
    const { name, username, password, phoneNumber } = req.body;
    try {
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json("User Already exists");
        }
        const result = await User.create({ name: name, username: username, password: password, phoneNumber: phoneNumber })
        res.status(201).json("User sucessfully created")
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong during user creation");
    }
}