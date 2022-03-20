const admins = require("../models/AdminModel")
const users = require("../models/UsersModel")
const { verifyToken } = require("../modules/jwt")


async function AuthMiddleware(req, res, next) {
    try {
        if(!req.cookies.token){
            next()
        }else{
            const verify = await verifyToken(req.cookies.token)

            if(!verify) {
                res.redirect('/')
                return
            }

            const user = await admins.findOne({
                _id: verify._id
            })

            if(!user){
                res.redirect("/")
                return
            }   
            
            req.user = user;
            res.redirect('/admin/schedule')
        }
    } catch (error) {
        res.redirect('/')
    }
}

module.exports = AuthMiddleware