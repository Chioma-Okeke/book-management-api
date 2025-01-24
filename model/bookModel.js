const mongoose = require("mongoose");

const bookModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookModel)
