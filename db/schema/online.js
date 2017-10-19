const mongoose = require('mongoose')

const OnlineSchema = new mongoose.Schema({
	online: String,
	willOnline: String
})

module.exports = OnlineSchema