const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path")
const routes = require("./routes/routes");
const mongo = require("./modules/mongoose");

const app = express()

async function server(port){
    try {
        
        app.use(express.json())
        app.use(express.urlencoded({extended: true}));
        app.use(cookieParser())
        app.use(express.static(path.join(__dirname, "public")));
        
        app.set("view engine", "ejs");
        app.set('views', path.join(__dirname, "public", "views"))

        await mongo()

        app.listen(port, () => {console.log(`SERVER IS READY AT ${port}`);})

    } catch (error) {
        console.log(error);
    }finally{
        routes(app)
    }
}

module.exports = server