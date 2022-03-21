const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: [3, "The name must be at least 3 letters long"],
        max: [128, "The name must consist of 36 letters"],
    },
    description: {
        type: String,
        default: "",
        required: false
    },
    url: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    }
})

const users = mongoose.model("videos", videoSchema);

module.exports = users;
