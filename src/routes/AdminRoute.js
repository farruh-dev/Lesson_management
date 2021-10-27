const { AdminSignUpGetController, AdminLoginGetController, AdminSignUpPostController, AdminLoginPostController, AdminSchedulePageGetController, AdminAddLessonTimeController, AdminStudentsGetController, AdminAddStudentPostController } = require("../controllers/AdminRouteController")
const { AdminAuthMiddleware, AdminSigUpMiddleware } = require("../middlewares/AdminMiddleware")

const router = require("express").Router()

// get
router.get('/registration', AdminSigUpMiddleware, AdminSignUpGetController)
router.get('/login', AdminLoginGetController)
router.get('/schedule', AdminAuthMiddleware, AdminSchedulePageGetController)
router.get('/students', AdminAuthMiddleware, AdminStudentsGetController)

// post
router.post('/registration', AdminSignUpPostController)
router.post('/login', AdminLoginPostController)
router.post('/schedule', AdminAddLessonTimeController)
router.post('/new_student', AdminAddStudentPostController)

module.exports = {
    path: "/admin",
    router
}