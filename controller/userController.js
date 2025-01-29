const generateToken = require("../jwt/tokengeneration");
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
    const { password, email, username } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

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
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .json({
                    message: "No existing user found with that email address",
                })
                .status(404);
        }

        const comparePassword = await bcrypt.compare(password, user.password); //used to compare the password
        if (!comparePassword) {
            return res.json("username or password is incorrect").status(400);
        }

        //remove user's password in the response
        const {password: _, ...userData} = user.toObject()

        const token = generateToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        })

        res.status(200).json({ message: "user logged in", user: userData });
    } catch (error) {
        res.send(error);
    }
};

const logout = async (req, res, next) => {
    res.cookie('token', "", {
        httpOnly: true,
        secure: process.env.NOD_ENV === "production",
        sameSite: "strict",
        maxAge: 0
    })
    res.status(200).json({msg: "User successfully logged out"})
}

module.exports = { signup, login, logout };
