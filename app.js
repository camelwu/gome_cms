const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require("express-session")
mongoose.promise = require('bluebird')
const UserModel = require('./db/model/user')
const VersionModel = require('./db/model/version')
const OnlineModel = require('./db/model/online')
const multer = require('multer')
const picPath = 'src/assets'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, picPath)
    }
})
const upload = multer({storage: storage})

const port = 3005
const app = express()

app.listen(port,()=>{
	console.log('server is working')
})
mongoose.connect('mongodb://127.0.0.1/gomeCMS', {useMongoClient: true})

app.use(session({ 
	secret: 'aeromind', 
	cookie: { maxAge: 72000000 },
	resave: false,
	saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json({limit:5000000}))
app.use(bodyParser.urlencoded({ extended: true ,limit:5000000}))

//路由
const router = express.Router()

//主页信息
router.get('/getMainPage',(req, res)=>{
	const title = req.query.title
	if( !title){
		VersionModel.findOne({active:10}).then((version)=>{
			if(!version){
				return res.send({
				    "code": 0,
				    "msg": "OK",
				    "data": {
				        "cover": {
				            "opacityLogo": "",
				            "logo": "",
							"backgroundPic": "",
							"smallPic": "",
							"blurBackgroundPic":"",
							"blurSmallPic":""
				        },
				        "introduction": [
				            {
				                "pic": "",
				                "title": "",
				                "summary": ""
				            },
				            {
				                "pic": "",
				                "title": "",
				                "summary": ""
				            },
				            {
				                "pic": "",
				                "title": "",
				                "summary": ""
				            }
				        ],
						"feature": {
							"title": "",
							"subTitle": "",
							"list": [
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								},
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								},
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								},
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								},
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								},
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								},
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								},
								{
									"pic" : "",
									"title": "",
					                "summary": ""
								}
							]
						},
						"download": {
							"title": "",
							"subTitle": "",
							"list": [
								{
									"pic1": "",
									"pic2": "",
									"url" : ""
								},
								{
									"pic1": "",
									"pic2": "",
									"url" : ""
								},
								{
									"pic1": "",
									"pic2": ""
								},
								{
									"pic1": "",
									"pic2": ""
								}
							]
						}
				    }
				})
			}
			res.send({
				code:0,
				msg:'ok',
				data:{
					"cover":version.cover,
					"introduction":version.introduction,
					"feature":version.feature,
					"download":version.downloadEnter
				}
			})
		}).catch((err)=>{
			res.send({code:10500,msg:"system err"})
		})
	}else{
		VersionModel.findOne({title:title}).then((version)=>{
			if(!version){
				return res.send({code:10405,msg:'版本不存在'})
			}
			res.send({
				code:0,
				msg:'ok',
				data:{
					"cover":version.cover,
					"introduction":version.introduction,
					"feature":version.feature,
					"download":version.downloadEnter
				}
			})
		}).catch((err)=>{
			res.send({code:10500,msg:"system err"})
		})
	}
})

//下载banner部分
router.get('/getDownload',(req, res)=>{
	const platform = req.query.platform
	const platformData = []
	const Windows = {
	 	"platform": "Windows",
    	"title": "Aeromind Android版",
        "summary": "便捷、高效、迅速",
        "size": "30.2 M",
        "version": "V2.0.0",
        "system": "Android4.0及以上",
		"time": "2017-10-10",
		"url": 'http://.....',
		"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
    }
    const Mac = {
	 	"platform": "Mac",
    	"title": "Aeromind Android版",
        "summary": "便捷、高效、迅速",
        "size": "30.2 M",
        "version": "V2.0.0",
        "system": "Android4.0及以上",
		"time": "2017-10-10",
		"url": 'http://.....',
		"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
    }
    const Android = {
	 	"platform": "Android",
    	"title": "Aeromind Android版",
        "summary": "便捷、高效、迅速",
        "size": "30.2 M",
        "version": "V2.0.0",
        "system": "Android4.0及以上",
		"time": "2017-10-10",
		"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
    }
    const iOS = {
	 	"platform": "iOS",
    	"title": "Aeromind Android版",
        "summary": "便捷、高效、迅速",
        "size": "30.2 M",
        "version": "V2.0.0",
        "system": "Android4.0及以上",
		"time": "2017-10-10",
		"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
    }
	if(platform == "Windows"){
		platformData.push(Windows)
	}
	if(platform == "Mac"){
		platformData.push(Mac)
	}
	if(platform == "Android"){
		platformData.push(Android)
	}
	if(platform == "iOS"){
		platformData.push(iOS)
	}
	if(!platform){
		platformData.push(Windows,Mac,Android,iOS)
	}
	if(platformData.length === 0){
		res.send({
			"code": 406,
			"msg": "params is error(platform)"
		})
		return
	}
	res.send({
	    "code": 0,
	    "msg": "OK",
	    "data": {
	    	"version":'V2.0.0',
	    	"platform": platformData
	    }
	})
})

//版本列表
router.get('/getVersionList',(req, res)=>{
	res.send({
	    "code": 0,
	    "msg": "OK",
	    "data": {
	    	"version":'V2.0.0',
	    	"platform": [
				{
				 	"platform": "Windows",
				 	"lists": [
						{
		        			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
							"time": "2017-10-10",
							"version": "V1.1.1"
						}
				 	]
		        },{
		        	"platform": "Mac",
				 	"lists": [
						{
		        			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
							"time": "2017-10-10",
							"version": "V1.1.1"
						}
				 	]
		        },{
		        	"platform": "Android",
				 	"lists": [
						{
		        			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
							"time": "2017-10-10",
							"version": "V1.1.1"
						}
				 	]
		        },{
		        	"platform": "iOS",
				 	"lists": [
						{
		        			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
							"time": "2017-10-10",
							"version": "V1.1.1"
						}
				 	]
		        }
	    	]
	    }
	})
})

//版本详情
router.get('/getVersionDetail',(req, res)=>{
	const title = req.query.title
	const version = req.query.version
	const platform = req.query.platform
	if(!title){
		VersionModel.findOne({active:10}).then((activeVersion)=>{
			if(activeVersion){
				const detail = activeVersion[platform].detail

				const resVersionArr = detail.map((item)=>{
					if(item.version == version){
						return item.list
					}
				})

				res.send({code:0,msg:'ok',data:resVersionArr || ""})
			}else{
				res.send({
				    "code": 0,
				    "msg": "OK",
				    "data": {
				    	"version":'',
				    	"title": '',
				    	"time": "",
				    	"platform":'',
				    	"list": [
							{
				    			"title": "",
								"imgs": []
					        }
				    	]
				    }
				})
			}
		}).catch((err)=>{
			res.send({code:10500,msg:'system err'})
		})
	}else{
		VersionModel.findOne({title:title}).then((activeVersion)=>{
			if(activeVersion){
				const detail = activeVersion[platform].detail
				let resVersionArr = {}
				detail.map((item)=>{
					if(item.version == version){
						resVersionArr = item
					}
					return item
				})
				if(resVersionArr.length){
					res.send({code:10405,msg:'编辑的版本不存在'})
				}else{
					res.send({code:0,msg:'ok',data:resVersionArr.list || [{title:'',imgs:[]}]})
				}
			}else{
				res.send({
				    "code": 0,
				    "msg": "OK",
				    "data": [
						{
			    			"title": "",
							"imgs": []
				        }
			    	]
				})
			}
		}).catch((err)=>{
			res.send({code:10500,msg:'system err'})
		})
	}
})

//## 入库接口
const aeromind = function(req, res, next){
	if(!req.session.user){
		return res.send({code: "10401", msg: "请登录"})
	}
	if(req.session.user.username == "aeromind-amind"){
		return res.send({code: "10401", msg: "请更换账号登录"})
	}
	next()
}
const superman = function(req, res, next){
	if(!req.session.user){
		return res.send({code: "10401", msg: "请登录"})
	}
	if(req.session.user.username !== "aeromind-admin"){
		return res.send({code: "10401", msg: "请更换 aeromind-admin 账号登录"})
	}
	next()
}
//登录
router.post('/super/login',(req, res)=>{
	const username = req.body.username
	const password = req.body.password
	UserModel.findOne({username:username}).then((user)=>{
		if(!user){
			req.session.user = ''
			return res.send({code:'10404',msg:'用户不存在'})
		}
		if(user.password !== password){
			req.session.user = ''
			return res.send({code:'10403',msg:"密码错误"})
		}
		req.session.user = user
		if(user.isSuper){
			return res.send({code:0, msg:'ok',isSuper: true})
		}
		res.send({code:0, msg:'ok',isSuper: false})
	}).catch((err)=>{
		res.send({code:'10500', msg:"system err"})
	})
})
//创建版本
router.post('/super/createVersion',aeromind,(req, res)=>{
	let title = req.body.title.trim()
	if(!title){
		return res.send({code:'10403', msg:'title 为空'})
	}

	VersionModel.findOne({title:title},(err, version)=>{
		if(err){
			return res.send({code:"10500",msg:"system err"})
		}
		if(version){
			return res.send({code:"10405",msg:"version 重复"})
		}
		VersionModel.findOne({active:10}).then((version)=>{
			if(version){
				new VersionModel({
					"title": title,
					"active": 1,
				    "cover": version.cover,
				    "introduction": version.introduction,
				    "feature":version.feature,
				    "downloadEnter": version.downloadEnter,
				    "windows": version.windows,
				    "ios": version.ios,
				    "mac": version.mac,
				    "android": version.android
				}).save((err, version)=>{
					if(err){
						return res.send({code:"10500",msg:"system err"})
					}
					res.send({code:"0",msg:"ok",data:{title: title, active: 1}})
				})
			}else{
				new VersionModel({
					"title": title,
					"active": 1,
				    "cover": {
				    	"opacityLogo": "",
			            "logo": "",
						"backgroundPic": "",
						"blurBackgroundPic":"",
						"smallPic": "",
						"blurSmallPic":""
				    },
				    "introduction": [
				    	{
							"pic" : "",
							"title": "",
			                "summary": ""
						},{
							"pic" : "",
							"title": "",
			                "summary": ""
						},{
							"pic" : "",
							"title": "",
			                "summary": ""
						}
				    ],
				    "feature": {
				    	"title": "",
						"subTitle": "",
						"list": [
							{
								"pic" : "",
								"title": "",
				                "summary": ""
							},
							{
								"pic" : "",
								"title": "",
				                "summary": ""
							},
							{
								"pic" : "",
								"title": "",
				                "summary": ""
							},{
								"pic" : "",
								"title": "",
				                "summary": ""
							},{
								"pic" : "",
								"title": "",
				                "summary": ""
							},{
								"pic" : "",
								"title": "",
				                "summary": ""
							},{
								"pic" : "",
								"title": "",
				                "summary": ""
							},{
								"pic" : "",
								"title": "",
				                "summary": ""
							}
						]
				    },
				    "downloadEnter": {
				    	"title": "",
						"subTitle": "",
						"list": [
							{
								"pic1": "",
								"pic2": "",
								"url" : ""
							},{
								"pic1": "",
								"pic2": "",
								"url" : ""
							},{
								"pic1": "",
								"pic2": ""
							},{
								"pic1": "",
								"pic2": ""
							}
						]
				    },
				    "windows":{
						"title": "",
				        "summary": "",
				        "size": "",
				        "version": "",
				        "system": "",
						"time": 0,
						"url": '',
						"backgroundPic": "",
						"detail":[
							{
								"title": "",
								"time": "",
								"version":"",
								"list":[
									{
										"title":'',
										"imgs":[]
									}
								]
							}
						]
					},
				    "ios": {
						"title": "",
				        "summary": "",
				        "size": "",
				        "version": "",
				        "system": "",
						"time": 0,
						"backgroundPic": "",
						"detail":[
							{
								"title": "",
								"time": "",
								"version":"",
								"list":[
									{
										"title":'',
										"imgs":[]
									}
								]
							}
						]
					},
				    "mac": {
				    	"title": "",
			            "summary": "",
			            "size": "",
			            "version": "",
			            "system": "",
						"time": 0,
						"url": '',
						"backgroundPic": "",
						"detail":[
							{
								"title": "",
								"time": "",
								"version":"",
								"list":[
									{
										"title":'',
										"imgs":[]
									}
								]
							}
						]
				    },
				    "android": {
				    	"title": "",
			            "summary": "",
			            "size": "",
			            "version": "",
			            "system": "",
						"time": 0,
						"backgroundPic": "",
						"detail":[
							{
								"title": "",
								"time": "",
								"version":"",
								"list":[
									{
										"title":'',
										"imgs":[]
									}
								]
							}
						]
				    }
				}).save((err, version)=>{
					if(err){
						return res.send({code:"10500",msg:"system err"})
					}
					res.send({code:"0",msg:"ok",data:{title: title, active: 1}})
				})
			}
		}).catch((err)=>{
			res.send({code:"10500",msg:"system err"})
		})
	})	
})
//获取版本
router.get('/super/getCreateVersion',aeromind, (req, res)=>{
	VersionModel.find().then((versions)=>{
		let versionArr = versions.map((item)=>{
			return {title:item.title,active:item.active}
		})
		res.send({code:0, versions:versionArr})
	}).catch((err)=>{
		res.send({code:"10500",msg:"system err"})
	})
})
//删除版本
router.post('/super/deleteVersion',aeromind, (req,res)=>{
	const title = req.body.title

	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({code:10403,msg:"删除的条目不存在"})
		}
		if(version.active == 2){
			return res.send({code:10403,msg:"当前为线上版本，不能删除"})
		}
		version.active = 0
		version.save().then((updatedVersion)=>{
			res.send({code:0,msg:'ok'})
		}).catch((err)=>{
			res.send({code:"10500", msg:"system err"})
		})
	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})
//提交版本
router.post('/super/releaseVersion',aeromind, (req, res)=>{
	const title = req.body.title.trim()
	if(!title){
		return res.send({code:10403, msg:'title 为空'})
	}
	VersionModel.findOne({active:3}).then((version)=>{
		if(version){
			return res.send({code:10403, msg:'已有一个版本提交，请通过审核后再试'})

			if(version.title === title){
				return res.send({code:10403, msg:'不能重复提交同一个版本'})
			}
			version.active = 1
			version.save().then((version)=>{

				VersionModel.findOne({title:title}).then((version)=>{
					if(!version){
						return res.send({code:10403, msg:'提交的版本不存在'})
					}
					if(version.active == 2 || version.active == 3){
						return res.send({code:10403, msg:'不能重复提交同一个版本'})
					}
					version.active = 3
					version.save().then((version)=>{
						res.send({code:0, msg:'ok'})
					}).catch((err)=>{
						res.send({code:"10500", msg:"system err"})
					})
				})
			}).catch((err)=>{
				res.send({code:"10500", msg:"system err"})
			})
		}else{
			VersionModel.findOne({title:title}).then((version)=>{
				if(!version){
					return res.send({code:10403, msg:'提交的版本不存在'})
				}
				if(version.active == 2){
					return res.send({code:10403, msg:'此版本已上线'})
				}
				version.active = 3
				version.save().then((version)=>{
					res.send({code:0, msg:'ok'})
				}).catch((err)=>{
					res.send({code:"10500", msg:"system err"})
				})
			})
		}
	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})	
})
//上传图片
router.post('/super/uploadImg',aeromind, upload.single('pic'), (req, res)=>{
	const mimetype = req.file.mimetype.split('/')[1]
    const filename = req.file.filename 
    const destination = req.file.destination

    const oldpath = path.join(__dirname, destination, filename)
    const newFileName = filename + '.' + mimetype
    //改名
    fs.renameSync(oldpath, path.join(__dirname, destination, newFileName))
    
    res.send({msg:'ok',code:0, src: newFileName ,name: req.file.originalname})
})
//主页信息录入
router.post('/super/setMain',aeromind, (req, res)=>{
	const title = req.body.title
	const cover = req.body.banner
	const introduction = req.body.introduction
	const feature = req.body.feature
	const downloadEnter = req.body.download

	if(!title){
		return res.send({code:10405, msg: 'version 不能为空'})
	}

	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({code:10405, msg: 'version 不存在'})
		}
		version.active = 1
		if(cover){
			version.cover = cover
		}
		if(introduction){
			version.introduction = introduction
		}
		if(feature){
			version.feature = feature
		}
		if(downloadEnter){
			version.downloadEnter = downloadEnter
		}
		version.save().then((version)=>{
			res.send({code:0, msg:"ok"})
		}).catch((err)=>{
			res.send({code:"10500", msg:"system err"})
		})

	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})
//download录入
router.post('/super/setDownload',aeromind, (req, res)=>{
	const title = req.body.title
	const windows = req.body.windows
	const ios = req.body.ios
	const android = req.body.android
	const mac = req.body.mac

	if(!title){
		return res.send({code:10405, msg: 'version 不能为空'})
	}

	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({code:10405, msg: 'version 不存在'})
		}
		version.active = 1
		if(windows){
			version.windows.title = windows.title
			version.windows.summary = windows.summary
			version.windows.size = windows.size
			version.windows.version = windows.version
			version.windows.time = windows.time
			version.windows.system = windows.system
			version.windows.url = windows.url
			version.windows.backgroundPic = windows.backgroundPic
		}
		if(ios){
			version.ios.title = ios.title
			version.ios.summary = ios.summary
			version.ios.size = ios.size
			version.ios.version = ios.version
			version.ios.time = ios.time
			version.ios.system = ios.system
			version.ios.backgroundPic = ios.backgroundPic
		}
		if(mac){
			version.mac.title = mac.title
			version.mac.summary = mac.summary
			version.mac.size = mac.size
			version.mac.version = mac.version
			version.mac.time = mac.time
			version.mac.system = mac.system
			version.mac.url = mac.url
			version.mac.backgroundPic = mac.backgroundPic
		}
		if(android){
			version.android.title = android.title
			version.android.summary = android.summary
			version.android.size = android.size
			version.android.version = android.version
			version.android.time = android.time
			version.android.system = android.system
			version.android.backgroundPic = android.backgroundPic
		}

		version.save().then((version)=>{
			res.send({code:0, msg:"ok"})
		}).catch((err)=>{
			res.send({code:"10500", msg:"system err"})
		})

	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})
//列表标题录入
router.post('/super/setList',aeromind, (req, res)=>{
	const title = req.body.title
	const platform = req.body.platform
	const subTitle = req.body.subTitle
	const version = req.body.version
	const time = req.body.time

	if(!title){
		return res.send({code:10405, msg: 'version 不能为空'})
	}

	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({code:10405, msg: 'version 不存在'})
		}
		version.active = 1

		if( platform && subTitle && version && time ){
			version[platform].detail.unshift(version[platform].detail[0])

			version[platform].detail[0].title = subTitle
			version[platform].detail[0].version = version
			version[platform].detail[0].time = time

		}else{
			return res.send({code:10405, msg: '参数不正确'})
		}
		
		version.save().then((version)=>{
			res.send({code:0, msg:"ok"})
		}).catch((err)=>{
			res.send({code:"10500", msg:"system err"})
		})

	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})
//详情录入
router.post('/super/setDetail',aeromind, (req, res)=>{
	const title = req.body.title
	const platform = req.body.platform
	const version = req.body.version
	const list = req.body.list

	if(!title){
		return res.send({code:10405, msg: 'version 不能为空'})
	}

	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({code:10405, msg: 'version 不存在'})
		}

		version.active = 1
		let hasVersion = false
		if( platform && version){
			version[platform].detail = version[platform].detail.map((item)=>{
				if(item.version == version){
					item.list = list
					console.log("hasVersion",hasVersion)
					hasVersion = true
				}
				return item
			})
		}else{
			return res.send({code:10405, msg: '参数不正确'})
		}
		
		if(hasVersion){
			version.save().then((version)=>{
				res.send({code:0, msg:"ok"})
			}).catch((err)=>{
				res.send({code:"10500", msg:"system err"})
			})
		}else{
			res.send({code:"10405", msg:"没有此版本"})
		}
	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})
//超级管理员获取 要上线的版本
//获取版本
router.get('/super/v-getCreateVersion',superman, (req, res)=>{
	VersionModel.findOne({active:3}).then((version)=>{
		if(!version){
			return res.send({code:10404, msg:'没有版本要上线'})
		}
		res.send({code:0, msg:'ok',version:{title:version.title, active:version.active}})
	}).catch((err)=>{
		res.send({code:"10500",msg:"system err"})
	})
})
//上线版本
router.post('/super/v-releaseVersion',superman, (req, res)=>{
	const title = req.body.title
	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({code: 10403, msg:"要上线的项目不存在"})
		}
		if(version.active == 0){
			return res.send({code: 10403, msg:"此版本已被删除"})
		}
		if(version.active == 1){
			return res.send({code: 10403, msg:"此版本没有提交不能上线"})
		}
		if(version.active == 2){
			return res.send({code: 10403, msg:"此版本已上线"})
		}
		if(version.active == 3){
			version.active = 2
			version.save().then((version)=>{
				VersionModel.findOne({active:10}).then((activeVersion)=>{
					if(!activeVersion){
						new VersionModel({
							"title": '_online',
							"active": 10,
						    "cover": version.cover,
						    "introduction": version.introduction,
						    "feature":version.feature,
						    "downloadEnter": version.downloadEnter,
						    "windows": version.windows,
						    "ios": version.ios,
						    "mac": version.mac,
						    "android": version.android,
						    "onlineTime": +(new Date())
						}).save((err, version)=>{
							if(err){
								return res.send({code:"10500",msg:"system err"})
							}
							res.send({code: 0, msg:"此版本上线成功"})
						})
					}else{
						activeVersion.title = "_online"
						activeVersion.active = 10
						activeVersion.cover = version.cover
						activeVersion.introduction = version.introduction
						activeVersion.feature =version.feature
						activeVersion.downloadEnter = version.downloadEnter
						activeVersion.windows = version.windows
						activeVersion.ios = version.ios
						activeVersion.mac = version.mac
						activeVersion.android = version.android
						activeVersion.onlineTime = +(new Date())

						activeVersion.save().then((version)=>{
							res.send({code: 0, msg:"此版本上线成功"})
						}).catch((err)=>{
							res.send({code:"10500", msg:"system err"})
						})
					}
				})
			}).catch((err)=>{
				res.send({code:"10500", msg:"system err"})
			})
		}
	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})

/*router.get('/super/signup',(req, res)=>{
	new UserModel({
		username: "aeromind-admin",
		password: "123.gome",
		isSuper: falses
	}).save(()=>{
		res.send({code:0,msg:"ok"})
	})
})*/
//router.use	
/**/

app.use('/admin', router)