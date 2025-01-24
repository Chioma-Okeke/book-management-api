const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({message: "Access denied. Please login first to continue"})
    }
    try {
        
    } catch (error) {
        
    }
}