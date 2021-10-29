const {
    AdminSignUpGetController,
    AdminLoginGetController,
    AdminSignUpPostController,
    AdminLoginPostController,
    AdminSchedulePageGetController,
    AdminAddLessonTimeController,
    AdminStudentsGetController,
    AdminStudentPreviewGetController,
    AdminAddStudentPostController,
    AdminUpdateSchedulePostController
} = require("../controllers/AdminRouteController")
const {
    AdminAuthMiddleware,
    AdminSigUpMiddleware
} = require("../middlewares/AdminMiddleware")

const router = require("express").Router()

// get
router.get('/', (req, res) => {res.redirect("/admin/schedule")})
router.get('/registration', AdminSigUpMiddleware, AdminSignUpGetController)
router.get('/login', AdminLoginGetController)
router.get('/schedule', AdminAuthMiddleware, AdminSchedulePageGetController)
router.get('/students', AdminAuthMiddleware, AdminStudentsGetController)
router.get('/students/get/:id', AdminAuthMiddleware, AdminStudentPreviewGetController)

// post
router.post('/registration', AdminSignUpPostController)
router.post('/login', AdminLoginPostController)
router.post('/schedule', AdminAddLessonTimeController)
router.post('/new_student', AdminAddStudentPostController)
router.post('/schedule/update', AdminUpdateSchedulePostController)

module.exports = {
    path: "/admin",
    router
}