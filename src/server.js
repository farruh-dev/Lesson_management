const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");

const app = express()

async function server(port){
    try {
        app.listen(port, () => {console.log(`SERVER IS READY AT ${port}`);})
        
        app.use(express.json())
        app.use(express.urlencoded({extended: true}));
        app.use(cookieParser())

        
        app.set("view-engine", "ejs");

    } catch (error) {
        console.log(error);
    }finally{
        // routes(app)
    }
}

module.exports = server