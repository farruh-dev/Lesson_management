const admins = require("../models/AdminModel");
const groups = require("../models/GroupModel");
const lessons = require("../models/LessonModel");
const schedule = require("../models/ScheduleModel");
const students = require("../models/StudentModel");
const users = require("../models/UsersModel");
const videos = require("../models/VideosModel");
const {
    createCrypt,
    compareCrypt
} = require("../modules/bcrypt");
const getVideoLink = require("../modules/getVideoLink");
const {
    createToken
} = require("../modules/jwt");
const {
    AdminSignUpValidation,
    AdminLoginValidation,
    AdminAddLessonTimeValidation,
    AdminAddStudentValidation,
    AdminEditLessonTimeValidation,
    AdminCreateGroupValidation,
    AdminUpdateNameValidation,
    AdminUpdateUsernameValidation,
    AdminUpdatePasswordValidation,
    AdminCreateVideoValidation
} = require("../modules/validations");

module.exports = class AdminRoute {
   
    static async AdminSignUpGetController(req, res) {
        res.render("admin_signup")
    }
    static async AdminLoginGetController(req, res) {
        res.render("admin_login")
    }
    static async AdminAccountGetController(req, res) {
        res.render("admin_account", {
            user: req.user
        })
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

            res.cookie("token", await createToken({
                _id: admin._id
            })).redirect('/admin/schedule')

        } catch (error) {
            res.render("admin_login", {
                error: error.message
            })
        }
    }
    static async AdminUpdateNamePostController(req, res) {
        try {
            const admin_id = req.params?.admin_id;

            const data = await AdminUpdateNameValidation(req.body)

            if (!data) {
                res.status(400).json({
                ok: false,
                message: "Given information is not valid!"
            })
                return
            }

            const admin = await admins.findOne({
                _id: admin_id,
            })

            if (!admin) {
                res.status(400).json({
                ok: false,
                message: "Admin not found!"
            })
                return
            }

            if (!(await compareCrypt(data.password, admin.password))) {
                res.status(400).json({
                ok: false,
                message: "Password is incorrect!"
            })
                return
            }

            await admins.findOneAndUpdate({
                _id: admin._id
            },{
                name: data.name,
                surname: data.surname
            }
            )

            res.status(200).json({
                ok: true,
                message: "Name updated successfully"
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error.message
            })
        }
    }
    static async AdminUpdateUsernamePostController(req, res) {
        try {
            const admin_id = req.params?.admin_id;

            const data = await AdminUpdateUsernameValidation(req.body)

            if (!data) {
                res.status(400).json({
                ok: false,
                message: "Given information is not valid!"
            })
                return
            }

            const admin = await admins.findOne({
                _id: admin_id,
            })

            if (!admin){
                res.status(400).json({
                ok: false,
                message: "Admin not found!"
            })
                return
            }

            if (!(await compareCrypt(data.password, admin.password))) {
                res.status(400).json({
                ok: false,
                message: "Password is incorrect!"
            })
                return
            }

            await admins.findOneAndUpdate({
                _id: admin._id
            },{
                username: data.username
            }
            )

            res.status(200).json({
                ok: true,
                message: "Username updated successfully"
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error.message
            })
        }
    }

    static async AdminUpdatePasswordPostController(req, res) {
        try {
            const admin_id = req.params?.admin_id;

            const data = await AdminUpdatePasswordValidation(req.body)

            if (!data){
                res.status(400).json({
                ok: false,
                message: "Given information is not valid!"
            })
                return
            }

            const admin = await admins.findOne({
                _id: admin_id,
            })

            if (!admin) {
                res.status(400).json({
                ok: false,
                message: "Admin not found!"
            })
                return
            }

            if (!(await compareCrypt(data.old_password, admin.password))) {
                res.status(400).json({
                ok: false,
                message: "Password is incorrect!"
            })
                return
            }

            if(!(data.new_password == data.confirm_password)){
                res.status(400).json({
                ok: false,
                message: "Confirmation password is incorrect!"
            })
                return
            }

            await admins.findOneAndUpdate({
                _id: admin._id
            },{
                password: await createCrypt(data.new_password)
            }
            )

            res.status(200).json({
                ok: true,
                message: "Password updated successfully"
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error.message
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
            res.redirect("/")
        }
    }
    static async AdminAddLessonTimeController(req, res) {
        try {
            let groups_array = []

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

             res.redirect('/admin/schedule')

        } catch (error) {
            res.redirect('/')
        }
    }
    
    static async AdminUpdateSchedulePostController(req, res) {
        try {

            const lesson_id = req.params?.lesson_id

            let request = {
                time: req.body.time,
                group: req.body.group,
                day: req.body.day,
            }

            const data = await AdminEditLessonTimeValidation(request)

            if (!data) throw new Error("Given information is not valid!");

            const day = await schedule.findOne({
                _id: data.day
            })

            const group = await groups.findOne({
                _id: data.group
            })

             const updated_lesson = await lessons.findOneAndUpdate({
                 _id: lesson_id,
             },{
                time: data.time,
                group: data.group,
                group_name: group.name,
                day: day._id,
                day_Id: data.day
             })

             res.redirect('/admin/schedule')

        } catch (error) {
            res.redirect('/')
        }
    }

    // static async AdminReplaceLessonTimePostController(req, res) {
    //     try {

    //         const lesson_id = req.params?.lesson_id
    //         const day_id = req.params?.day_id

    //         const day = await schedule.findOne({
    //             _id: day_id
    //         })

    //         if(!day) throw new Error("Day not found")

    //          await lessons.updateOne({
    //              _id: lesson_id,
    //          },{
    //             day_id: day._id,
    //             day: day.day,
    //          })

    //          res.redirect('/admin/schedule')

    //     } catch (error) {
    //         res.redirect('/')
    //     }
    // }

    static async AdminDeleteLessonTimeController(req, res){
        try {

             await lessons.deleteOne({
                 _id: req.params.lesson_id
             })

             res.status(200).json({
                 ok: true
             })

        } catch (error) {
            res.redirect('/admin/schedule');
        }
    }
    static async AdminStudentsGetController(req, res) {
        try {

            const students_list = await students.find();
            const schedule_list = await schedule.find();
            const lessons_list = await lessons.find();
            const groups_list = await groups.find();

            res.render("students_list", {
                user: req.user,
                students_list,
                schedule_list,
                lessons_list,
                groups_list
            })

        } catch (error) {
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

            res.render("student_preview", {
                user: req.user, 
                student,
                lesson_times,
            })

        } catch (error) {
            res.redirect('/')
        }
    }
    static async AdminAddStudentPostController(req, res) {
        try {

            const data = await AdminAddStudentValidation(req.body);

            if(!data) throw new Error("Given information is not valid!")


            const new_student = await students.create({
                fullname: data.fullname,
                gender: data.gender,
                phone: data.phone.trim() == "" ? "-" : data.phone,
                telegram: data.telegram.trim() == "" ? "-" : data.telegram,
                started_at: data.started_at.trim() == "" ? "-" : data.started_at
            })

            res.redirect("/admin/students");

        } catch (error) {
            res.redirect('/admin/students');
        }
    }

    static async AdminDeleteStudentController(req, res){
        try {

             await students.deleteOne({
                 _id: req.params.student_id
             })

             res.status(200).json({
                 ok: true
             })

        } catch (error) {
            res.redirect('/admin/students');
        }
    }

    static async AdminUpdateStudentPostController(req, res) {
        try {

            const data = await AdminAddStudentValidation(req.body);

            if(!data) throw new Error("Given information is not valid!")

            const updated_student = await students.findOneAndUpdate({
                _id: req.params.id
            },{
                fullname: data.fullname,
                gender: data.gender,
                phone: data.phone.trim() == "" ? "-" : data.phone,
                telegram: data.telegram.trim() == "" ? "-" : data.telegram,
                started_at: data.started_at.trim() == "" ? "-" : data.started_at
            })

            if(!updated_student) throw new Error("Given information is not valid!")

            res.redirect(`/admin/students/get/${updated_student._id}`);

        } catch (error) {
            res.redirect('/admin/students');
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
            res.redirect('/admin/groups');
        }
    }

    static async AdminUpdateGroupPostController(req, res){
        try {
            const group_id = req.params?.group_id

            const selected_students = []

            if(Array.isArray(req.body.students)){
                for(let i of req.body.students){
                    selected_students.push(i)
                }
            }else{
                selected_students.push(req.body.students)
            }

            const request = {
                name: req.body.name,
                students: selected_students
            }

            const data = await AdminCreateGroupValidation(request)

            if(!data) throw new Error("Group not found")

            const group = await groups.findOne({
                _id: group_id
            })

            if(!group) throw new Error("Group not found")

            const updated_group = await groups.findOneAndUpdate({
                _id: group._id
            }, {
                name: data.name,
            })

            await students.updateMany({
                student_group_id: group_id
            }, {
                student_group_id: null 
            })

            for (const id of data.students) {
                const student = await students.findOneAndUpdate({
                    _id: id,
                }, {
                    student_group_id: group._id 
                })
            }

            res.redirect('/admin/groups')
        } catch (error) {
            res.redirect('/admin/groups')
        }
    }
    static async AdminDeleteGroupController(req, res){
        try {
             await groups.deleteOne({
                 _id: req.params.group_id,
             })

             const student = await students.updateMany({
                student_group_id: req.params.group_id
            }, {
                student_group_id: null 
            })

             const lesson = await lessons.deleteMany({
                group: req.params.group_id
            })

            console.log(lesson);

            res.status(200).json({
                ok: true
            })

        } catch (error) {
            console.log(error);
            res.redirect('/admin/groups');
        }
    }

    static async AdminVideosGetController(req, res){
        try {

            const videos_list = await videos.find()

            res.render("videos", {
               videos_list
            });

        } catch (error) {
            res.redirect('/admin/videos');
        }
    }

    static async AdminCreateVideoPostController(req, res){
        try {
            const data = await AdminCreateVideoValidation(req.body)

            if (!data) throw new Error("Given information is not valid!");

            const link = getVideoLink(data.url)

            if(!link) {
                throw new Error("Invalid url!")
            }

             const new_video = await videos.create({
                 title: data.title,
                 description: data.description,
                 url: link,
                 img: `https://img.youtube.com/vi/${link}/hqdefault.jpg`
             })

             res.redirect('/admin/videos')

        } catch (error) {
            res.redirect('/admin/videos');
        }
    }

    static async AdminUpdateVideoController(req, res){
        try {
            const data = await AdminCreateVideoValidation(req.body)

            if (!data) throw new Error("Given information is not valid!");

            const link = getVideoLink(data.url)

            if(!link) {
                throw new Error("Invalid url!")
            }

             const video = await videos.updateOne({
                 _id: req.params.video_id
             },{
                title: data.title,
                description: data.description,
                url: link,
                img: `https://img.youtube.com/vi/${link}/hqdefault.jpg`
            })

             res.redirect('/admin/videos')

        } catch (error) {
            res.redirect('/admin/videos');
        }
    }

    static async AdminDeleteVideoController(req, res){
        try {

             const new_video = await videos.deleteOne({
                 _id: req.params.video_id
             })

             res.status(200).json({
                 ok: true
             })

        } catch (error) {
            res.redirect('/admin/videos');
        }
    }

    

    static async AdminExitController(req, res){
        try{
            res.clearCookie("token").redirect('/')
        }catch(error){
            res.redirect('/')
        }
    }

}