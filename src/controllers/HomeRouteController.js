
const groups = require("../models/GroupModel");
const lessons = require("../models/LessonModel");
const schedule = require("../models/ScheduleModel");
const students = require("../models/StudentModel");


module.exports = class HomeRoute{
    static async HomeRouteGetController(req, res){
        try {
            const lessonsList = await lessons.find()
            const lesson_schedule = await schedule.find()
            const students_list = await students.find()
            const group_list = await groups.find()

            res.render("index", {
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

    static async GroupsGetController(req, res){
        try {

            const students_list = await students.find()
            const group_list = await groups.find()

            res.render("groups_user", {
                group_list,
                students_list,
            });

        } catch (error) {
            console.log("ADD_GROUP_ERROR:", error);
            res.redirect('/admin/groups');
        }
    }
} 