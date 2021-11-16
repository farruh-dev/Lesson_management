
const {createCrypt} = require("./bcrypt")

module.exports = async function init(admins){
    try {
        const admins_list = await admins.find()

        if(admins_list.length == 0){
            const admin = await admins.create({
                name: "admin",
                surname: "admin",
                username: "admin",
                password: await createCrypt("admin"),
            })
            console.log(admin);
        }
    } catch (error) {
        console.log("INIT_ERROR",error);
    }
}