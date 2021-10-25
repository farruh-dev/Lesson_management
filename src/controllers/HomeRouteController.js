module.exports = class HomeRoute{
    static async HomeRouteGetController(req, res){
        res.render("index")
    }
} 