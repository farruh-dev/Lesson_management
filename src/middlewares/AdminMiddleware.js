const admins = require("../models/AdminModel")
const { verifyToken } = require("../modules/jwt") 

async function AdminSigUpMiddleware(req, res, next) {
    try {

        const existance = await admins.find()

        if (existance.length != 0) {
            res.redirect("/admin/login")
            return
        }else{
            next()
        }

    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
}

async function AdminAuthMiddleware(req, res, next) {
    try {
        if(!req.cookies.token){
            console.log("NO TOKEN");
            res.redirect("/admin/login")
            return
        }else{
            const verify = await verifyToken(req.cookies.token)

            if(!verify) {
                res.redirect('/admin/login')
                return
            }

            const admin = await admins.findOne({
                _id: verify._id
            })

            if(!admin){
                res.redirect("/admin/login")
                return
            }   
            
            req.user = admin;
            next()
        }
    } catch (error) {
        console.log(error);
        res.redirect('/admin/login') 

    }
}


module.exports = {
    AdminAuthMiddleware,
    AdminSigUpMiddleware
}