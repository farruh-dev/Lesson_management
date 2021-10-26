const HomeRoute = require("./HomeRoute")
const UserRoute = require("./UserRoute")
const AdminRoute = require("./AdminRoute")

module.exports =  (app) => {
    app.use(HomeRoute.path, HomeRoute.router)
    app.use(UserRoute.path, UserRoute.router)
    app.use(AdminRoute.path, AdminRoute.router)
}