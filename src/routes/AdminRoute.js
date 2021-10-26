const { AdminSignUpGetController, AdminLoginGetController, AdminSignUpPostController, AdminLoginPostController, AdminSchedulePageGetController, AdminAddLessonTimeController, AdminStudentsGetController } = require("../controllers/AdminRouteController")
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

module.exports = {
    path: "/admin",
    router
}