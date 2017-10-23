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
    "adroid": Object,
    "createTime": {
    	type:Number,
    	default: +(new Date())
    },
    "updateTime": {
    	type: Number,
    	default: +(new Date())
    },
    "onlineTime":Number
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
VersionSchema.pre('save',function(next){
	if(this.isNew){
		this.createTime = this.updateTime = +(new Date())
	}else{
		this.updateTime = +(new Date())
	}
	next()
})


module.exports = VersionSchema