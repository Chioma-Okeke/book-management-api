const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        publications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "book",            
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user", userModel);
