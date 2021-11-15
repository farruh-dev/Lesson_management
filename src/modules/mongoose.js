const mongoose = require('mongoose');
const levels = require('../models/LevelsModel');
const schedule = require('../models/ScheduleModel');
require("dotenv").config()

require("../models/UsersModel")
require("../models/AdminModel")
require("../models/ScheduleModel")
require("../models/LessonModel")
require("../models/LevelsModel")
require("../models/GroupModel")

async function mongo(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)

    } catch (error) {
        console.log("MONGO_ERROR: ", error);
    }
}

module.exports = mongo