const { UserSignUpGetController, UserSignUpPostController } = require("../controllers/UserRouteController")

const router = require("express").Router()

router.get('/registration', UserSignUpGetController)
router.post('/registration', UserSignUpPostController)

module.exports = {
    path: "/users",
    router
}