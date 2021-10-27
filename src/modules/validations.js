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
    static async AdminAddLessonTimeValidation(data){
        return await joi.object({
            time: joi.string().required().error(new Error("Time in not valid!")),
            students: joi.array().required().error(new Error("Students list in not valid!")),
            day_id: joi.string().required().error(new Error("Something went wrong!")),
            day_name: joi.string().required().error(new Error("Something went wrong!")),
        }).validateAsync(data)
    }
    static async AdminAddStudentValidation(data){
        return await joi.object({
            fullname: joi.string().required().error(new Error("Full name in not valid!")),
            age: joi.string().required().error(new Error("Age in not valid!")),
            gender: joi.string().required(),
            phone: joi.string().trim().allow(null, ""),
            telegram: joi.string().trim().allow(null, ""),
            level: joi.string().error(new Error("Level in not valid!")),
            started_at: joi.string().trim().allow(null, ""),
        }).validateAsync(data)
    }
}