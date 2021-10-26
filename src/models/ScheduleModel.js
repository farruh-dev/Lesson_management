const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
})

const schedule = mongoose.model("schedule", scheduleSchema);

module.exports = schedule;
