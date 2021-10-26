const admins = require("../models/AdminModel");
const students = require("../models/StudentModel");
const { createCrypt, compareCrypt } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const { AdminSignUpValidation, AdminLoginValidation } = require("../modules/validations");

module.exports = class AdminRoute{
    static async AdminSignUpGetController(req, res){
        res.render("admin_signup")
    }
    static async AdminLoginGetController(req, res){
        res.render("admin_login")
    }

     static async AdminSignUpPostController(req, res) {
         try {
             const data = await AdminSignUpValidation(req.body)

             if(!data) throw new Error("Given information is not valid!")

             const admin = await admins.find()

             if(admin) throw new Error(`Admin already exists!`)

             const new_admin = await admins.create({
                 name: data.name,
                 surname: data.surname,
                 email: data.email,
                 password: await createCrypt(data.password)
             })

             res.redirect('/admin/login')

         } catch (error) {
             console.log("ADMIN_SIGNUP_ERROR:", error);
             res.render("admin_signup", {
                 error: error.message
             })
         }
     }
     static async AdminLoginPostController(req, res) {
         try {
             const data = await AdminLoginValidation(req.body)

             if(!data) throw new Error("Ma'lumotlarda xatolik mavjud!")

             const admin = await admins.findOne({
                 email: data.email,
             })

             if(!admin) throw new Error("Not found!")

             if(!(await compareCrypt(data.password, admin.password))){
                 throw new Error("Password is incorrect!")
             }

             res.cookie("token", await createToken({
                 _id: admin._id
             })).redirect('/admin')

         } catch (error) {
             console.log("LOGIN_ERROR:", error);
             res.render("login", {
                error: error.message
            })
         }
     }
} 