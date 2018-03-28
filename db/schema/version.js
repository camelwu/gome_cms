const mongoose = require('mongoose')

const VersionSchema = new mongoose.Schema({
	"title": String,
	"active": Number,
    "cover": Object,
    "introduction": Array,
    "feature":Object,
    "downloadEnter": Object,
    "windows": Object,
    "ios": Object,
    "mac": Object,
    "android": Object,
    "createTime": {
    	type:Number,
    	default: +(new Date())
    },
    "updateTime": {
    	type: Number,
    	default: +(new Date())
    },
    "onlineTime":{
    	type: Number,
    	default: 0
    }
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
		title:...
		size:...
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