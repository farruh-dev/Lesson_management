const router = require("express").Router()

const { HomeRouteGetController } = require("../controllers/HomeRouteController")

router.get('/', HomeRouteGetController)

module.exports = {
    path: "/",
    router
}