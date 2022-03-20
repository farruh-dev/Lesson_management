const router = require("express").Router()

const { HomeRouteGetController, GroupsGetController, VideosGetController, VideoGetController } = require("../controllers/HomeRouteController")
const AuthMiddleware = require("../middlewares/AuthMiddleware")

router.get('/', AuthMiddleware , HomeRouteGetController)
router.get('/groups', AuthMiddleware , GroupsGetController)
router.get('/videos', AuthMiddleware , VideosGetController)
router.get('/videos/:video_id', AuthMiddleware , VideoGetController)

module.exports = {
    path: "/",
    router
}