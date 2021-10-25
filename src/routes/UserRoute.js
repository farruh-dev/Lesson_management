const { UserSignUpGetController, UserSignUpPostController, UserLoginGetController, UserLoginPostController } = require("../controllers/UserRouteController")

const router = require("express").Router()

// get
router.get('/registration', UserSignUpGetController)
router.get('/login', UserLoginGetController)

// post
router.post('/registration', UserSignUpPostController)
router.post('/login', UserLoginPostController)

module.exports = {
    path: "/users",
    router
}