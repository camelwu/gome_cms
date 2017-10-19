const mongoose = require('mongoose')
const VersionSchema = require('../schema/version')

const VersionModel = mongoose.model('version',VersionSchema)

module.exports = VersionModel