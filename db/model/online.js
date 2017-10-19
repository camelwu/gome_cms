const mongoose = require('mongoose')
const OnlineSchema = require('../schema/online')

const OnlineModel = mongoose.model('online', OnlineSchema)

module.exports = OnlineModel