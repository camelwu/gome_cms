const mongoose = require('mongoose')
const UserSchema = require('../schema/user')

const UserModel = mongoose.model('user',UserSchema)

module.exports = UserModel