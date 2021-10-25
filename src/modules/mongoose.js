const mongoose = require('mongoose');
require("dotenv").config()

require("../models/UserModel")

async function mongo(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("MONGO_ERROR: ", error);
    }
}

module.exports = mongo