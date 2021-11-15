const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
})

const groups = mongoose.model("groups", groupSchema);

module.exports = groups;
