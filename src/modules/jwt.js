const { sign, verify } = require("jsonwebtoken")
require("dotenv").config()

async function createToken(data) {
    return sign(data, process.env.JWT_SECRET)
}

async function verifyToken(token) {
    try {
        return verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return false
    }
}

module.exports = {
    createToken,
    verifyToken
}