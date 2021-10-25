const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: [3, "Ism minimum 3 ta harf bo'lishi lozim"],
        max: [36, "Ism maximum 36 ta harf bo'lishi lozim"],
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const users = mongoose.model("users", userSchema);

module.exports = users;
