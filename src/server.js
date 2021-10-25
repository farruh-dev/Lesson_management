const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path")
const routes = require("./routes/routes");

const app = express()

async function server(port){
    try {
        
        app.use(express.json())
        app.use(express.urlencoded({extended: true}));
        app.use(cookieParser())
        app.use(express.static(path.join(__dirname, "public")));
        
        app.set("view engine", "ejs");
        const viewsPath = path.join(path.join(__dirname, "public", "views"))
        app.set('views', viewsPath)

        app.listen(port, () => {console.log(`SERVER IS READY AT ${port}`);})

    } catch (error) {
        console.log(error);
    }finally{
        routes(app)
    }
}

module.exports = server