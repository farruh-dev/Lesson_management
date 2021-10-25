const { SignUpValidation } = require("../modules/validations");

module.exports = class UserRoute{
    static async UserSignUpGetController(req, res){
        res.render("signup")
    }
     static async UserSignUpPostController(req, res) {
         try {
             const data = await SignUpValidation(req.body)

             if(!data) throw new Error("Ma'lumotlarda xatolik mavjud!")

             
         } catch (error) {
             console.log("SIGNUP_ERROR:", error + '' );
         }
     }
} 