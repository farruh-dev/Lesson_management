require("dotenv").config()
const server = require("./src/server");

server(process.env.PORT ? process.env.PORT : 8999)

