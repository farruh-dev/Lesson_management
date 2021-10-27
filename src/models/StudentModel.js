const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: "-"
    },
    telegram: {
        type: String,
        default: "-"
    },
    level: {
        type: String,
        required: true,
    },
})

const students = mongoose.model("students", studentSchema);

module.exports = students;
