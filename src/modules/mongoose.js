const mongoose = require('mongoose');
const schedule = require('../models/ScheduleModel');
require("dotenv").config()

require("../models/StudentModel")
require("../models/AdminModel")
require("../models/ScheduleModel")
require("../models/LessonModel")

async function mongo(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)

    } catch (error) {
        console.log("MONGO_ERROR: ", error);
    }
}

module.exports = mongo