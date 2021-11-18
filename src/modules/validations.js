const joi = require("joi")

module.exports = class Validations{
    static async SignUpValidation(data){
        return await joi.object({
            name: joi.string().required().trim().min(3).max(36).error(new Error("Name is not valid!")),
            surname: joi.string().required().trim().min(3).max(36).error(new Error("Surname is not valid!")),
            username: joi.string().required().trim().error(new Error("Nickname is not valid!")),
            password: joi.string().required().min(4).error(new Error("Password is not valid!")),
        }).validateAsync(data)
    }
    static async AdminSignUpValidation(data){
        return await joi.object({
            name: joi.string().required().trim().min(3).max(36).error(new Error("Name is not valid!")),
            surname: joi.string().required().trim().min(3).max(36).error(new Error("Surname is not valid!")),
            username: joi.string().required().error(new Error("Username is not valid!")),
            password: joi.string().required().min(6).error(new Error("Password is not valid!")),
        }).validateAsync(data)
    }
    static async LoginValidation(data){
        return await joi.object({
            username: joi.string().required().trim().error(new Error("Nickname is not valid!")),
            password: joi.string().required().error(new Error("Password is not valid!")),
        }).validateAsync(data)
    }
    static async AdminLoginValidation(data){
        return await joi.object({
            username: joi.string().required().error(new Error("Username is not valid!")),
            password: joi.string().required().error(new Error("Password is not valid!")),
        }).validateAsync(data)
    }
    static async AdminAddLessonTimeValidation(data){
        return await joi.object({
            time: joi.string().required().error(new Error("Time is not valid!")),
            group: joi.string().required().error(new Error("Group is not valid!")),
            day_id: joi.string().required().error(new Error("Something went wrong!")),
            day_name: joi.string().required().error(new Error("Something went wrong!")),
        }).validateAsync(data)
    }
    static async AdminEditLessonTimeValidation(data){
        return await joi.object({
            time: joi.string().required().error(new Error("Time is not valid!")),
            group: joi.string().required().error(new Error("Group is not valid!")),
        }).validateAsync(data)
    }
    static async AdminAddStudentValidation(data){
        return await joi.object({
            fullname: joi.string().required().error(new Error("Full name is not valid!")),
            phone: joi.string().trim().allow(null, ""),
            telegram: joi.string().trim().allow(null, ""),
            level_id: joi.string().error(new Error("Level is not valid!")),
            started_at: joi.string().trim().allow(null, ""),
        }).validateAsync(data)
    }
    static async AdminCreateGroupValidation(data){
        return await joi.object({
            name: joi.string().required().error(new Error("Name is not valid!")),
            students: joi.array().error(new Error("Students are required"))            
        }).validateAsync(data)
    }
    static async AdminUpdateNameValidation(data){
        return await joi.object({
            password: joi.string().required().error(new Error("Passowrd is not valid!")),           
            name: joi.string().required().error(new Error("Name is not valid!")),           
            surname: joi.string().required().error(new Error("Surname is not valid!"))           
        }).validateAsync(data)
    }
    static async AdminUpdateUsernameValidation(data){
        return await joi.object({
            password: joi.string().required().error(new Error("Passowrd is not valid!")),           
            username: joi.string().required().error(new Error("Username is not valid!")),                 
        }).validateAsync(data)
    }
    static async AdminUpdatePasswordValidation(data){
        return await joi.object({
            old_password: joi.string().required().error(new Error("Passowrd is not valid!")),           
            new_password: joi.string().required().error(new Error("New passowrd is not valid!")),           
            confirm_password: joi.string().required().error(new Error("Confirmation passowrd is not valid!")),           
        }).validateAsync(data)
    }
}