
const {createCrypt} = require("./bcrypt")
require('dotenv').config()

module.exports = async function init(admins){
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
        
    } catch (error) {
        console.log("INIT_ERROR",error);
    }
}