const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
    const { password, email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (user) {
            return res.json("User already exists").status(409);
        }
        if (!emailRegex.test(email)) {
            return res.json("Invalid email address").status(400);
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new userModel({
            ...req.body,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        next({ status: 500, message: "Something went wrong" });
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            console.log("user check worked");
            return res
                .json({ message: "password or username is incorrect" })
                .status(404);
        }
        const comparePassword = await bcrypt.compare(password, user.password); //used to compare the password
        if (!comparePassword) {
            console.log("password check worked");
            return res.json("username or password is incorrect").status(400);
        }
        res.status(200).json({ message: "user logged in", user });
    } catch (error) {
        res.send(error);
    }
};

module.exports = { signup, login };
