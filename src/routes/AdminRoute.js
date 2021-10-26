const { AdminSignUpGetController, AdminLoginGetController, AdminSignUpPostController, AdminLoginPostController } = require("../controllers/AdminRouteController")

const router = require("express").Router()

// get
router.get('/registration', AdminSignUpGetController)
router.get('/login', AdminLoginGetController)

// post
router.post('/registration', AdminSignUpPostController)
router.post('/login', AdminLoginPostController)

module.exports = {
    path: "/admin",
    router
}