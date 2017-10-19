const mongoose = require('mongoose')

const VersionSchema = new mongoose.Schema({
	"title": String,
	"active": Number,
    "cover": Object,
    "introduction": Array,
    "feature":Object,
    "downloadEnter": Object,
    "winoows": Object,
    "ios": Object,
    "mac": Object,
    "adroid": Object
})
/*

{
	version:"930",
	active:1,
	cover:{
		pic:...
	},
	instroduction:[
		{
			title..
		}
	],
	feature:{
		title..
		list:[
			{
				pic
			}
		]
	},
	downloadEnter:{
		title:..
		list:...
	},
	windows:{
		time...
		version...
		detail:[
			{
				pic:..
				title...
			}
		]
	}
	....
}	

*/

module.exports = VersionSchema