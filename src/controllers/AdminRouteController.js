const admins = require("../models/AdminModel");
const groups = require("../models/GroupModel");
const lessons = require("../models/LessonModel");
const levels = require("../models/LevelsModel");
const schedule = require("../models/ScheduleModel");
const students = require("../models/StudentModel");
const users = require("../models/UsersModel");
const {
    createCrypt,
    compareCrypt
} = require("../modules/bcrypt");
const {
    createToken
} = require("../modules/jwt");
const {
    AdminSignUpValidation,
    AdminLoginValidation,
    AdminAddLessonTimeValidation,
    AdminAddStudentValidation,
    AdminEditLessonTimeValidation,
    AdminCreateGroupValidation
} = require("../modules/validations");

module.exports = class AdminRoute {
   
    static async AdminSignUpGetController(req, res) {
        res.render("admin_signup")
    }
    static async AdminLoginGetController(req, res) {
        res.render("admin_login")
    }

    static async AdminSignUpPostController(req, res) {
        try {
            const data = await AdminSignUpValidation(req.body)

            if (!data) throw new Error("Given information is not valid!")

            const admin = await admins.find()

            if (admin.length != 0) throw new Error(`Admin already exists!`)

            const new_admin = await admins.create({
                name: data.name,
                surname: data.surname,
                username: data.username,
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

            if (!data) throw new Error("Given information is not valid!")

            const admin = await admins.findOne({
                username: data.username,
            })

            if (!admin) throw new Error("Not found!") 

            if (!(await compareCrypt(data.password, admin.password))) {
                throw new Error("Password is incorrect!")
            }

            console.log("ADMIN", admin);

            res.cookie("token", await createToken({
                _id: admin._id
            })).redirect('/admin/schedule')

        } catch (error) {
            console.log("LOGIN_ERROR:", error);
            res.render("admin_login", {
                error: error.message
            })
        }
    }
    static async AdminSchedulePageGetController(req, res) {
        try {

            const lessonsList = await lessons.find()
            const lesson_schedule = await schedule.find()
            const students_list = await students.find()
            const group_list = await groups.find()

            res.render("admin_page", {
                user: req.user,
                lessonsList,
                lesson_schedule,
                students_list,
                group_list
            })
        } catch (error) {
            console.log(error);
            res.redirect("/")
        }
    }
    static async AdminAddLessonTimeController(req, res) {
        try {
            let groups_array = []
            console.log(req.body.group);

            const data = await AdminAddLessonTimeValidation(req.body)

            if (!data) throw new Error("Given information is not valid!");

            const group = await groups.findOne({
                _id: data.group
            })

             const new_lesson = await lessons.create({
                 time: data.time,
                 group: data.group,
                 group_name: group.name, 
                 day_id: data.day_id,
                 day: data.day_name,
             })

             console.log(new_lesson);

             res.redirect('/admin/schedule')

        } catch (error) {
            console.log("ADD_LESSON_ERROR:", error);
            res.redirect('/')
        }
    }
    static async AdminStudentsGetController(req, res) {
        try {

            const students_list = await students.find();
            const levels_list = await levels.find();
            const schedule_list = await schedule.find();
            const lessons_list = await lessons.find();
            const groups_list = await groups.find();

            res.render("students_list", {
                user: req.user,
                students_list,
                levels_list,
                schedule_list,
                lessons_list,
                groups_list
            })

        } catch (error) {
            console.log("GET_STUDENTS_ERROR:", error);
            res.redirect('/')
        }
    }
    static async AdminStudentPreviewGetController(req, res) {
        try {

            const student = await students.findOne({
                _id: req.params.id
            })

            if(!student) throw new Error("Student not found!")

            const lesson_times = await lessons.find({
                group: student.student_group_id
            })

            const levels_list = await levels.find();

            res.render("student_preview", {
                user: req.user, 
                student,
                lesson_times,
                levels_list
            })

        } catch (error) {
            console.log("STUDENT_PREVIEW_ERROR:", error);
            res.redirect('/')
        }
    }
    static async AdminAddStudentPostController(req, res) {
        try {

            const data = await AdminAddStudentValidation(req.body);

            if(!data) throw new Error("Given information is not valid!")

            const level = await levels.findOne({
                _id: data.level_id
            })

            const new_student = await students.create({
                fullname: data.fullname,
                gender: data.gender,
                phone: data.phone.trim() == "" ? "-" : data.phone,
                telegram: data.telegram.trim() == "" ? "-" : data.telegram,
                level: level.name,
                level_id: level._id,
                started_at: data.started_at.trim() == "" ? "-" : data.started_at
            })

            console.log(new_student);

            res.redirect("/admin/students");

        } catch (error) {
            console.log("ADD_STUDENT_ERROR:", error);
            res.redirect('/admin/students');
        }
    }

    static async AdminUpdateStudentPostController(req, res) {
        try {

            const data = await AdminAddStudentValidation(req.body);

            if(!data) throw new Error("Given information is not valid!")

            const level = await levels.findOne({
                _id: data.level_id
            })

            const updated_student = await students.findOneAndUpdate({
                _id: req.params.id
            },{
                fullname: data.fullname,
                gender: data.gender,
                phone: data.phone.trim() == "" ? "-" : data.phone,
                telegram: data.telegram.trim() == "" ? "-" : data.telegram,
                level: level.name,
                level_id: level._id,
                started_at: data.started_at.trim() == "" ? "-" : data.started_at
            })

            if(!updated_student) throw new Error("Given information is not valid!")


            console.log(updated_student);

            res.redirect(`/admin/students/get/${updated_student._id}`);

        } catch (error) {
            console.log("UPDATE_STUDENT_ERROR:", error);
            res.redirect('/admin/students');
        }
    }

    static async AdminUpdateSchedulePostController(req, res) {
        try {

            console.log(req.body);

            let selected_students = []
            let students_array = []

            if(Array.isArray(req.body.students)){
                for (const student of req.body.students) {
                    selected_students.push(student)
                }
            }else{
                selected_students.push(req.body.students)
            }

            let request = {
                time: req.body.time,
                students: selected_students,
                lesson_id: req.body.lesson_id
            }

            const data = await AdminEditLessonTimeValidation(request)

            if (!data) throw new Error("Given information is not valid!");

            for (const id of data.students) {
                const student = await students.findOne({
                    _id: id
                })
                students_array.push({
                    student_id: student._id,
                    student_name: student.fullname,
                })
            }

             const updated_lesson = await lessons.findOneAndUpdate({
                 _id: data.lesson_id,
             },{
                time: data.time,
                students: students_array,
             })

             console.log(updated_lesson);

             res.redirect('/admin/schedule')

        } catch (error) {
            console.log("ADD_LESSON_ERROR:", error);
            res.redirect('/')
        }
    }

    static async AdminGroupsGetController(req, res){
        try {

            const lessons_list = await lessons.find()
            const schedule_list = await schedule.find()
            const students_list = await students.find()
            const group_list = await groups.find()

            res.render("groups", {
                group_list,
                students_list,
                lessons_list,
                schedule_list
            });

        } catch (error) {
            console.log("ADD_GROUP_ERROR:", error);
            res.redirect('/admin/groups');
        }
    }

    static async AdminCreateGroupPostController(req, res){
        try {

            let selected_students = []
            let students_array = []

            if(Array.isArray(req.body.students)){
                for (const student of req.body.students) {
                    selected_students.push(student)
                }
            }else{
                selected_students.push(req.body.students)
            }

            let request = {
                name: req.body.name ? req.body.name : `Group${Date().now()}`,
                students: selected_students,
            }

            const data = await AdminCreateGroupValidation(request)

            if (!data) throw new Error("Given information is not valid!");

             const new_group = await groups.create({
                 name: data.name,
             })

             for (const id of data.students) {
                const student = await students.findOneAndUpdate({
                    _id: id
                }, {
                    $set: {
                        student_group_id: new_group._id 
                    }
                })
            }

             res.redirect('/admin/groups')

        } catch (error) {
            console.log("ADD_GROUP_ERROR:", error);
            res.redirect('/admin/groups');
        }
    }

}