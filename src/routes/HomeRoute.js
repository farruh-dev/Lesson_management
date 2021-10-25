const router = require("express").Router()

const { HomeRouteGetController } = require("../controllers/HomeRouteController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.get('/', AuthMiddleware , HomeRouteGetController)

module.exports = {
    path: "/",
    router
}