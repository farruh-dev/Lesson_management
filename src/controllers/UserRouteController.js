const users = require("../models/UsersModel");
const { createCrypt, compareCrypt } = require("../modules/bcrypt");
const { createToken } = require("../modules/jwt");
const { SignUpValidation, LoginValidation } = require("../modules/validations");

module.exports = class UserRoute{
    static async UserSignUpGetController(req, res){
        res.render("signup")
    }
    static async UserLoginGetController(req, res){
        res.render("login")
    }
     static async UserSignUpPostController(req, res) {
         try {
             const data = await SignUpValidation(req.body)

             if(!data) throw new Error("Given information is not valid!")

             const user = await users.findOne({
                 username: data.username
             })

             if(user) throw new Error(`Nickname "${data.username}" is already in use, think another`)

             const new_user = await users.create({
                 name: data.name,
                 surname: data.surname,
                 username: data.username,
                 password: await createCrypt(data.password),
                 user_role: "user"
             })

             res.redirect('/users/login')

         } catch (error) {
             console.log("SIGNUP_ERROR:", error);
             res.render("signup", {
                 error: error.message
             })
         }
     }
     static async UserLoginPostController(req, res) {
         try {
             const data = await LoginValidation(req.body)

             if(!data) throw new Error("Ma'lumotlarda xatolik mavjud!")

             const user = await users.findOne({
                 username: data.username,
             })

             console.log(user);

             if(!user) throw new Error("User not found")

             if(!(await compareCrypt(data.password, user.password))){
                 throw new Error("Password is incorrect")
             }

             console.log(user);

             res.cookie("token", await createToken({
                    _id: user._id
                })).redirect('/')

         } catch (error) {
             console.log("LOGIN_ERROR:", error);
             res.render("login", {
                error: error.message
            })
         }
     }
} 