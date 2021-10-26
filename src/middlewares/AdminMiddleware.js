const admins = require("../models/AdminModel")

async function AdminMiddleware(req, res, next){
    try {
        if(!req.cookies.token){
            res.redirect("/admin/login")
        }else{
            const verify = await verifyToken(req.cookies.token)

            if(!verify) {
                res.redirect('/admin/login')
                return
            }

            const admin = await admins.findOne({
                _id: verify.user_id
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
        res.redirect('/')
    }
}