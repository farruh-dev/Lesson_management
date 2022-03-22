
const groups = require("../models/GroupModel");
const lessons = require("../models/LessonModel");
const schedule = require("../models/ScheduleModel");
const students = require("../models/StudentModel");
const videos = require("../models/VideosModel");


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
            res.redirect("/")
        }
    }

    static async GroupsGetController(req, res){
        try {

            const students_list = await students.find()
            const group_list = await groups.find()

            console.log(group_list)
            console.log(students_list)

            res.render("groups_user", {
                group_list,
                students_list,
            });

        } catch (error) {
            res.redirect('/groups');
        }
    }

    static async VideosGetController(req, res){
        try {
            const videos_list = await videos.find().sort({'createdAt': -1})

            let promise = videos_list.exec();

            promise.then(v => {
                res.render("videos_user", {
                    videos_list: v
                });
            });

        } catch (error) {
            res.redirect('/videos');
        }
    }

    static async VideoGetController(req, res){
        try {
            const video = await videos.findOne({
                _id: req.params.video_id
            })

            res.render("video", {
                video
            });

        } catch (error) {
            res.redirect('/videos');
        }
    }
} 