const students = require("../models/StudentModel")
const { verifyToken } = require("../modules/jwt")


async function AuthMiddleware(req, res, next) {
    try {
        if(!req.cookies.token){
            res.redirect("/users/login")
        }else{
            const verify = await verifyToken(req.cookies.token)

            if(!verify) {
                res.redirect('/users/login')
                return
            }

            const user = await students.findOne({
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