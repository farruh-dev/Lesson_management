const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    day_id: {
        type: mongoose.Types.ObjectId,
        ref: "schedule"
    },
    day: {
        type: String,
        ref: "schedule"
    },
    students: {
        type: [{student_id: mongoose.Types.ObjectId, student_name: String}],
        required: true
    }
})

const lessons = mongoose.model("lessons", lessonSchema);

module.exports = lessons;
