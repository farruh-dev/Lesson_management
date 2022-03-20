
const {createCrypt} = require("./bcrypt")
require('dotenv').config()

module.exports = async function init(admins){
    try {
        const admins_list = await admins.find()

        if(admins_list.length == 0){
            const admin = await admins.create({
                name: "Adminjon",
                surname: "Adminov",
                username: process.env.PASSWORD,
                password: await createCrypt(process.env.USERNAME),
            })
            console.log(admin);
        }
    } catch (error) {
        console.log("INIT_ERROR",error);
    }
}