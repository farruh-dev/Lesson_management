const joi = require("joi")

module.exports = class Validations{
    static async SignUpValidation(data){
        return await joi.object({
            name: joi.string().required().trim().min(3).max(36).error(new Error("Name in not valid!")),
            surname: joi.string().required().trim().min(3).max(36).error(new Error("Surname in not valid!")),
            username: joi.string().required().trim().error(new Error("Nickname in not valid!")),
            password: joi.string().required().min(4).error(new Error("Password in not valid!")),
        }).validateAsync(data)
    }
    static async AdminSignUpValidation(data){
        return await joi.object({
            name: joi.string().required().trim().min(3).max(36).error(new Error("Name in not valid!")),
            surname: joi.string().required().trim().min(3).max(36).error(new Error("Surname in not valid!")),
            email: joi.string().required().email().trim().error(new Error("Email in not valid!")),
            password: joi.string().required().min(4).error(new Error("Password in not valid!")),
        }).validateAsync(data)
    }
    static async LoginValidation(data){
        return await joi.object({
            username: joi.string().required().trim().error(new Error("Nickname in not valid!")),
            password: joi.string().required().error(new Error("Password in not valid!")),
        }).validateAsync(data)
    }
    static async AdminLoginValidation(data){
        return await joi.object({
            email: joi.string().required().email().trim().error(new Error("Email in not valid!")),
            password: joi.string().required().error(new Error("Password in not valid!")),
        }).validateAsync(data)
    }
}