const joi = require("joi")

module.exports = class Validations{
    static async SignUpValidation(data){
        return await joi.object({
            name: joi.string().required().trim().min(3).max(36).error("Ismda xatolik bor!"),
            email: joi.string().required().trim().lowercase().error("Emailda xatolik bor!"),
            password: joi.string().required().error("Emailda xatolik bor!"),
        }).validateAsync(data)
    }
}