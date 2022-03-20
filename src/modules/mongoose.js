const mongoose = require('mongoose');
const init = require('./init');
require("dotenv").config()

const admins = require('../models/AdminModel');
require("../models/UsersModel")
require("../models/AdminModel")
require("../models/ScheduleModel")
require("../models/LessonModel")
require("../models/GroupModel")
require("../models/VideosModel")

async function mongo(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        
        await init(admins)

    } catch (error) {
        console.log("MONGO_ERROR: ", error);
    }
}

module.exports = mongo