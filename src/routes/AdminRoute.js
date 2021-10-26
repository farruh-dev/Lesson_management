const { AdminSignUpGetController, AdminLoginGetController, AdminSignUpPostController, AdminLoginPostController, AdminPageGetController } = require("../controllers/AdminRouteController")
const { AdminAuthMiddleware, AdminSigUpMiddleware } = require("../middlewares/AdminMiddleware")

const router = require("express").Router()

// get
router.get('/', AdminAuthMiddleware, AdminPageGetController)
router.get('/registration', AdminSigUpMiddleware, AdminSignUpGetController)
router.get('/login', AdminLoginGetController)

// post
router.post('/registration', AdminSignUpPostController)
router.post('/login', AdminLoginPostController)

module.exports = {
    path: "/admin",
    router
}