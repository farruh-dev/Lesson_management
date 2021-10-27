const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cefr: {
        type: String,
        default: "-"
    },
    ielts: {
        type: String,
        default: "-"
    }
})

const levels = mongoose.model("levels", levelSchema);

module.exports = levels;
