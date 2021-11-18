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
    AdminUpdateSchedulePostController,
    AdminUpdateStudentPostController,
    AdminGroupsGetController,
    AdminCreateGroupPostController,
    AdminUpdateGroupPostController,
    AdminAccountGetController,
    AdminUpdateNamePostController,
    AdminUpdateUsernamePostController,
    AdminUpdatePasswordPostController
} = require("../controllers/AdminRouteController")
const {
    AdminSigUpMiddleware,
    AdminAuthMiddleware
} = require("../middlewares/AdminMiddleware")

const AuthMiddleware = require("../middlewares/AuthMiddleware")

const router = require("express").Router()

// get
router.get('/', (req, res) => {res.redirect("/admin/schedule")})
router.get('/registration', AdminSigUpMiddleware, AdminSignUpGetController)
router.get('/login', AdminLoginGetController)
router.get('/account', AdminAuthMiddleware, AdminAccountGetController)
router.get('/schedule', AdminAuthMiddleware, AdminSchedulePageGetController)
router.get('/students', AdminAuthMiddleware, AdminStudentsGetController)
router.get('/groups', AdminAuthMiddleware, AdminGroupsGetController)
router.get('/students/get/:id', AdminAuthMiddleware, AdminStudentPreviewGetController)

// post
router.post('/registration', AdminSignUpPostController)
router.post('/login', AdminLoginPostController)
router.post('/schedule', AdminAuthMiddleware, AdminAddLessonTimeController)
router.post('/new_student', AdminAuthMiddleware, AdminAddStudentPostController)
router.post('/new_group', AdminAuthMiddleware, AdminCreateGroupPostController)
router.post('/fullname/:admin_id', AdminUpdateNamePostController)
router.post('/username/:admin_id', AdminUpdateUsernamePostController)
router.post('/password/:admin_id', AdminUpdatePasswordPostController)
router.post('/students/update/:id', AdminAuthMiddleware, AdminUpdateStudentPostController)
router.post('/schedule/update/:lesson_id', AdminAuthMiddleware, AdminUpdateSchedulePostController)
router.post('/groups/update/:group_id', AdminAuthMiddleware, AdminUpdateGroupPostController)

module.exports = {
    path: "/admin",
    router
}