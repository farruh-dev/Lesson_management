const { genSalt, compare, hash } = require("bcrypt")

async function createCrypt(data){
    const salt = await genSalt(10)
    return hash(data, salt)
}

async function compareCrypt(data, hash) {
    return await compare(data, hash)
}

module.exports = {
    createCrypt,
    compareCrypt
}