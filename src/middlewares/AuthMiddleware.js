const admins = require("../models/AdminModel")
const users = require("../models/UsersModel")
const { verifyToken } = require("../modules/jwt")


async function AuthMiddleware(req, res, next) {
    try {
        if(!req.cookies.token){
            console.log("NO TOKEN");
            res.redirect("/users/login")
            return
        }else{
            const verify = await verifyToken(req.cookies.token)

            if(!verify) {
                res.redirect('/users/login')
                return
            }

            const user = await users.findOne({
                _id: verify._id
            })

            if(!user){
                res.redirect("/users/login")
                return
            }   
            
            req.user = user;
            next()
        }
    } catch (error) {
        console.log(error);
        res.redirect('/users/login')
    }
}

module.exports = AuthMiddleware