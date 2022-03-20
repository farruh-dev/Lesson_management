const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullname: {
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
    student_group_id: {
        type: mongoose.Types.ObjectId,
        ref: "groups"
    },
    started_at: {
        type: String,
        default: "-"
    },
})

const students = mongoose.model("students", studentSchema);

module.exports = students;
