
const {createCrypt} = require("./bcrypt")
require('dotenv').config()

module.exports = async function init(admins, days){
    try {
        const admins_list = await admins.find()

        if(admins_list.length == 0){
            const admin = await admins.create({
                name: "Adminjon",
                surname: "Adminov",
                username: process.env.ADMIN_USERNAME,
                password: await createCrypt(process.env.ADMIN_PASSWORD),
            })
        }
        const days_list = await days.find()

        let day_data = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ]

        if(days_list.length == 0){
            for (const day of day_data) {
                await days.create({
                    day: day
                })
            }
        }
        
    } catch (error) {
        console.log("INIT_ERROR",error);
    }
}