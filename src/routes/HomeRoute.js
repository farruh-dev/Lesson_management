const router = require("express").Router()

const { HomeRouteGetController, GroupsGetController } = require("../controllers/HomeRouteController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.get('/', AuthMiddleware , HomeRouteGetController)
router.get('/groups', AuthMiddleware , GroupsGetController)

module.exports = {
    path: "/",
    router
}