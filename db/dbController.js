const mongoose = require('mongoose');

const connectedDb = async (req, res) => {
    try {
        await mongoose.connect(process.env.DBCONNECTIONSTRING)
    } catch (error) {
        console.error(error)
    }
    console.log("connected to db")
}

module.exports = connectedDb