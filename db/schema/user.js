const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	username: String,
    password: String,
    isSuper: Boolean
})

module.exports = UserSchema