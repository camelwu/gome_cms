const fs = require('fs')
const path = require('path')
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require("express-session")
mongoose.promise = require('bluebird')
const UserModel = require('./db/model/user')
const VersionModel = require('./db/model/version')
const multer = require('multer')
const picPath = 'views/css/uploadImg'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, picPath)
    }
})
const upload = multer({storage: storage})

//预览
const domain = 'https://work.gomeplus.com'
const selfmain = 'http://127.0.0.1:3005'

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

app.use(bodyParser.json({limit:5000000}))
app.use(bodyParser.urlencoded({ extended: true ,limit:5000000}))

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')


app.use('/css', express.static('views/css'))
app.use('/versionList', express.static('views/versionList'))
app.use('/js', express.static('views/js'))
app.use('/page', express.static('views/page'))
app.use('/h5',express.static('views/h5'))

//路由
const router = express.Router()

//主页信息*
router.get('/getMainPage',(req, res)=>{
	const title = req.query.title
	if(!title){
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
router.get('/getDownload',(req, res) => {
	let title = req.query.title
	let platform = req.query.platform
	if(!title){
		VersionModel.findOne({ active: 10 }).then((version) => {
			if(!version) {
				return res.send({ code: "10403", msg: "version is not exist" })
			}
			if(platform) {
				let data = version[platform]
				delete data.detail
				return res.send({ code: 0, msg: "ok", "data": data})
			}
			let plats = ['windows', 'mac', 'ios', 'android']
			let result = {}
			plats.map((plat) => {
				result[plat] = version[plat]
				//delete result[plat].detail
			})
			return res.send({ code: 0, msg: "ok", "data": result})
		}).catch((err)=>{
			res.send({ code: 10500, msg: "system err" })
		})
	}else{
		VersionModel.findOne({ title: title }).then((version) => {
			if(!version) {
				return res.send({ code: "10405", msg: "version is not exist" })
			}
			if(platform) {
				let data = version[platform]
				delete data.detail
				return res.send({ code: 0, msg: "ok", "data": data})
			}
			let plats = ['windows', 'mac', 'ios', 'android']
			let result = {}
			plats.map((plat) => {
				result[plat] = version[plat]
				//delete result[plat].detail
			})
			return res.send({ code: 0, msg: "ok", "data": result})
		}).catch((err)=>{
			res.send({ code: 10500, msg: "system err" })
		})
	}
})

//版本列表
router.get('/getVersionList', (req, res) => {
	const title = req.query.title
	if(!title){
		VersionModel.findOne({ active: 10 }).then((version) => {
			if(!version) {
				return res.send({ code: 10405,msg: '查询的版本不存在' })
			}
			let plats = ['windows', 'mac', 'ios', 'android']
			let result = {}
			plats.map((plat) => {
				let temp = version[plat].detail
				let details = []
				temp.map((detail) => {
					delete detail.list
					details.push(detail)
				})
				result[plat] = details
			})
			res.send({ code: 0, msg: result })
		}).catch((err) => {
			console.log(err)
			res.send({ code: 10500, msg: 'system err' })
		})
	}else{
		VersionModel.findOne({ title: title }).then((version) => {
			if(!version) {
				return res.send({ code: 10405,msg: '查询的版本不存在' })
			}
			let plats = ['windows', 'mac', 'ios', 'android']
			let result = {}
			plats.map((plat) => {
				let temp = version[plat].detail
				let details = []
				temp.map((detail) => {
					delete detail.list
					details.push(detail)
				})
				result[plat] = details
			})
			res.send({ code: 0, msg: result })
		}).catch((err) => {
			console.log(err)
			res.send({ code: 10500, msg: 'system err' })
		})
	}
})

//版本详情
router.get('/getVersionDetail',(req, res)=>{
	const title = req.query.title
	const version = req.query.version
	const platform = req.query.platform
	if(platform == 'ios' || platform == 'windows' || platform == 'android' || platform == 'mac'){
		if(!title){
			VersionModel.findOne({active:10}).then((activeVersion)=>{
				if(activeVersion){
					const detail = activeVersion[platform].detail
					let resVersion = ''
					detail.map((item)=>{
						if(item.version == version){
							resVersion = item
						}
						return item
					})

					if(resVersion){
						res.send({code:0,msg:'ok',data:resVersion})
					}else{
						res.send({code:10405,msg:'版本不错在'})
					}
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
					let resVersion = ''
					detail.map((item)=>{
						if(item.version == version){
							resVersion = item
						}
						return item
					})
					if(resVersion){
						res.send({code:0,msg:'ok',data:resVersion})
					}else{
						res.send({code:10405,msg:'编辑的版本不存在'})
					}
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
		}
	}else{
		res.send({code: 10403, msg:'platform 有错'})
	}
})

//## 入库接口
//10401 权限错误
//10403 提交内容 数据库未找到
//10405 提交参数有问题
//10500 系统报错
const aeromind = function(req, res, next){
	if(!req.session.user){
		return res.send({code: "10401", msg: "请登录"})
	}
	next()
}
const superman = function(req, res, next){
	if(!req.session.user){
		return res.send({code: "10401", msg: "请登录"})
	}
	if(!req.session.user.isSuper){
		return res.send({code: "10401", msg: "请更换 管理员 账号登录"})
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
//创建版本*
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
						"time": '',
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
						"time": '',
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
						"time": '',
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
						"time": '',
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
//获取版本*
router.get('/super/getCreateVersion',aeromind, (req, res)=>{
	VersionModel.find({active:{$lt:10}}).sort({createTime: -1}).then((versions)=>{
		let versionArr = versions.map((item)=>{
			return {title:item.title,active:item.active,time:item.onlineTime}
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
//提交版本*
router.post('/super/releaseVersion',aeromind, (req, res)=>{
	const title = req.body.title.trim()
	if(!title){
		return res.send({code:10403, msg:'title 为空'})
	}
	VersionModel.findOne({active:2}).then((version)=>{
		if(version){
			return res.send({code:10403, msg:'已有一个版本提交，将上个版本审核后再试'})
			/*version.active = 1
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
			})*/
		}else{
			VersionModel.findOne({title:title}).then((version)=>{
				if(!version){
					return res.send({code:10403, msg:'提交的版本不存在'})
				}
				if(version.active == 3){
					return res.send({code:10403, msg:'此版本已上线'})
				}
				version.active = 2
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
//上传图片*
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
//download 录入
router.post('/super/releaseDownload', aeromind, (req, res) => {
	const plat  = req.body.plat
	const title = req.body.title
	VersionModel.findOne({ title: title }).then((version) => {
		if (!version) {
			return res.send({ code: "10403", msg: "要上线的项目不存在" })
		}
		version.active = 1
		version[plat] = req.body.data
		version.save().then((version) => {
			res.send({ code: 200, msg: "ok", data: version[plat] })
		}).catch((err) => {
			res.send({ code: "10500", msg: "system err" })
		})
	}).catch((err)=>{
		res.send({ code: "10500", msg: "system err" })
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
//上线版本
//active:10 线上使用版本，title固定为'_online'
//active:0 被删除
//active:1 未提交版本(待提交)
//active:2 提交版本 (已提交，待审核)
//active:3 审核通过版本 (已发布，线上版本)
//active:4 审核未通过  (审核不通过)
//通过审核*
router.post('/super/v-agree',superman, (req, res)=>{
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
		if(version.active == 3){
			return res.send({code: 10403, msg:"此版本已上线"})
		}
		if(version.active == 2){
			VersionModel.findOne({active:3}).then((activeVersion)=>{
				if(activeVersion){
					activeVersion.active = 1
					activeVersion.onlineTime = 0
					activeVersion.save().then((aVersion)=>{
						version.active = 3
						version.onlineTime = +(new Date())
						version.save().then((onlineVersion)=>{
							VersionModel.findOne({active:10}).then((oVersion)=>{
								if(oVersion){
									oVersion.cover = version.cover
									oVersion.introduction = version.introduction
									oVersion.feature =version.feature
									oVersion.downloadEnter = version.downloadEnter
									oVersion.windows = version.windows
									oVersion.ios = version.ios
									oVersion.mac = version.mac
									oVersion.android = version.android
									oVersion.onlineTime = +(new Date())

									activeVersion.save().then((version)=>{
										res.send({code: 0, msg:"此版本上线成功"})
									}).catch((err)=>{
										res.send({code:10500, msg:"system err"})
									})
								}else{
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
								}
							}).catch((err)=>{
								res.send({code:10500, msg:"system err"})
							})
						}).catch((err)=>{
							res.send({code:10500, msg:"system err"})
						})
					}).catch((err)=>{
						res.send({code:10500, msg:"system err"})
					})
				}else{
					version.active = 3
					version.onlineTime = +(new Date())
					version.save().then((onlineVersion)=>{
						VersionModel.findOne({active:10}).then((oVersion)=>{
							if(oVersion){
								oVersion.cover = version.cover
								oVersion.introduction = version.introduction
								oVersion.feature =version.feature
								oVersion.downloadEnter = version.downloadEnter
								oVersion.windows = version.windows
								oVersion.ios = version.ios
								oVersion.mac = version.mac
								oVersion.android = version.android
								oVersion.onlineTime = +(new Date())

								activeVersion.save().then((version)=>{
									res.send({code: 0, msg:"此版本上线成功"})
								}).catch((err)=>{
									res.send({code:10500, msg:"system err"})
								})
							}else{
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
							}
						}).catch((err)=>{
							res.send({code:10500, msg:"system err"})
						})
					}).catch((err)=>{
						res.send({code:10500, msg:"system err"})
					})
				}
			}).catch((err)=>{
				console.log(err)
				res.send({code:10500, msg:"system err"})
			})
		}
	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})
//拒绝审核*
router.post('/super/v-refuse',superman, (req, res)=>{
	const title = req.body.title
	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({code: 10403, msg:"要上线的项目不存在"})
		}
		if(version.active == 0){
			return res.send({code: 10403, msg:"此版本已被删除"})
		}
		if(version.active == 1){
			return res.send({code: 10403, msg:"此版本没有提交，不用拒绝"})
		}
		if(version.active == 3){
			return res.send({code: 10403, msg:"此版本已上线"})
		}
		if(version.active == 2){
			version.active = 4
			version.save().then((version)=>{
				res.send({code:0, msg:'ok'})
			}).catch((err)=>{
				res.send({code:10500, msg:"system err"})
			})
		}
	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})
router.get('/super/signup',(req, res)=>{
	const username = req.query.u
	const password = req.query.p
	const isSuper = req.query.s
	/*console.log('u ' + username)
	console.log(JSON.stringify(username))
	console.log('p ' + password)
	console.log(JSON.stringify(password))
	console.log('s ' + isSuper)
	console.log(typeof isSuper)
	console.log(JSON.stringify(isSuper))
	return */
	if(isSuper){
		UserModel.findOne({isSuper:true}).then((user)=>{
			if(user){
				user.username = username
				user.password = password
				user.save().then((user)=>{
					res.send({code: 0,msg:"ok"})
				}).catch((err)=>{
					res.send({code: 10500,msg:'system err'})
				})
			}else{
				new UserModel({
					username: username,
					password: password,
					isSuper: true
				}).save((err, user)=>{
					if(err){
						return res.send({code:10500, msg:"system err"})
					}
					res.send({code: 0,msg:"ok"})
				})
			}
		}).catch((err)=>{
			res.send({code: 10500,msg:'system err'})
		})
	}else{
		UserModel.findOne({username:username}).then((user)=>{
			if(user){
				return res.send({code:10400, msg:'已存在'})
			}
			new UserModel({
				username: username,
				password: password,
				isSuper: false
			}).save((err, user)=>{
				if(err){
					return res.send({code:10500, msg:"system err"})
				}
				res.send({code: 0,msg:"ok"})
			})
		}).catch((err)=>{
			console.log(err)
			res.send({code: 10500,msg:'system err'})
		})
	}
})

//预览
// 主页预览*
router.get('/pre',aeromind,(req, res)=>{
	const title = req.query.version
	res.redirect(selfmain + '?version='+title)
})
//download预览*
router.get('/pre/download',aeromind,(req, res)=>{
	const title = req.query.version
	res.redirect(selfmain + '/downloads?version='+title)
})
// versionList预览*
router.get('/pre/versionList',aeromind,(req, res)=>{
	const title = req.query.version
	res.redirect(selfmain + '/versionList?version='+title)
})
// detail预览*
router.get('/pre/detail',aeromind,(req, res)=>{
	const title = req.query.version
	const platform = req.query.platform
	const version = req.query.version
	res.redirect(selfmain + '/updates/' + platform + '-' + version + '?version='+title)
})

app.use('/admin', router)

app.get("/", function(req, res){
	let title = ''
	if(req.query.version){
		title = req.query.version
		req.session.title = title
	}else if(req.session.title){
		title = req.session.title
	}
	if(!title){
		return res.send({msg:'版本不存在'})
	}
	
	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({msg:'版本不存在'})
		}
		res.render("index",{title:'首页',domain: domain,cover:{
			cover: version.cover,
			introduction: version.introduction,
			feature: version.feature,
			download:version.downloadEnter
		}})
	}).catch((err)=>{
		res.send({code:10500, msg:'system err'})
	})
})
// 下载
app.get("/downloads", (req, res)=>{
	let title = ''
	if(req.query.version){
		title = req.query.version
		req.session.title = title
	}else if(req.session.title){
		title = req.session.title
	}
	console.log(title)
	if(!title){
		return res.send({msg:'版本不存在'})
	}
	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({msg:'版本不存在'})
		}
		res.render("page/main", {title : "下载", domain : domain, banner:{
			windows: version.windows,
			ios: version.ios,
			android: version.android,
			mac: version.mac
		}, ver: {
			windows: version.windows.detail,
			ios: version.ios.detail,
			android: version.android.detail,
			mac: version.mac.detail
		}})
	}).catch((err)=>{
		console.log(err)
		res.send({code:10500, msg:'system err'})
	})
})
// 列表
app.get("/versionList", function(req, res) {
	let title = ''
	if(req.query.version){
		title = req.query.version
		req.session.title = title
	}else if(req.session.title){
		title = req.session.title
	}
	console.log(title)
	if(!title){
		return res.send({msg:'版本不存在'})
	}
	VersionModel.findOne({title:title}).then((version)=>{
		if(!version){
			return res.send({msg:'版本不存在'})
		}
		res.render("versionList/versionList", {title : "Version update list", domain:domain, vers: {
			windows: version.windows.detail,
			ios: version.ios.detail,
			android: version.android.detail,
			mac: version.mac.detail
		}})
	}).catch((err)=>{
		res.send({code:10500, msg:'system err'})
	})
})
// 日志
app.get("/updates/:ver", function(req, res) {
	let title = ''
	if(req.query.version){
		title = req.query.version
		req.session.title = title
	}else if(req.session.title){
		title = req.session.title
	}
	console.log(title)
	if(!title){
		return res.send({msg:'版本不存在'})
	}
	const ver = req.params.ver
    const platform = ver.split('-')[0]
    const activeVersion = ver.split('-')[1]
    VersionModel.findOne({title:title}).then((version)=>{
    	if(!version){
    		return res.send({msg:'版本不存在'})
    	}
    	let detail = ''
    	version[platform].detail.map((item)=>{
    		if(item.version == activeVersion){
    			detail = item
    		}
    	})
    	if(detail){
    		res.render('page/version', {title : "隐私政策", domain : domain, detail: detail})
    	}else{
    		res.send({code:10405,msg:'版本不存在'})
    	}
    }).catch((err)=>{
    	console.log(err)
    	res.send({code:10500,msg:'system errr'})
    })
})
// 关于我们
app.get("/aboutus", function(req, res) {
    res.render("page/about", {title : "公司介绍", domain : domain, para: '0'})
})
// 联系我们
app.get("/contractus", function(req, res) {
    res.render("page/about", {title : "联系我们", domain : domain, para: '1'})
})
// 常见问题
app.get("/faq", function(req, res) {
    res.render("page/more", {title : "常见问题", domain : domain, para: '0'})
})
// 服务协议
app.get("/terms", function(req, res) {
    res.render("page/more", {title : "服务协议", domain : domain, para: '1'})
})
// 隐私政策
app.get("/pravites", function(req, res) {
    res.render("page/more", {title : "隐私政策", domain : domain, para: '2'})
})
//h5模板
app.get("/html5", function(req, res) {
	let title = ''
	if(req.query.version){
		title = req.query.version
		req.session.title = title
	}else if(req.session.title){
		title = req.session.title
	}
	console.log(title)
	if(!title){
		return res.send({msg:'版本不存在'})
	}
	const platform = req.query.platform
    const activeVersion = req.query.version
	axios.get('/getVersionDetail?title=' + title + '&version=' + activeVersion +'&platform=' + platform).then((r)=>{
		const data = r.data
		const number = data.data
    	res.render("page/h5", {title : "h5模板", domain : domain, number: number})
	}).catch((err)=>{
		console.log(err)
	})
	/*let result = {
        "code": 0,
        "msg": "OK",
        "data": {
            "version":'V2.0.0',
            "title": 'Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！',
            "time": "2017-10-10",
            "list": [
                {
                    "title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
                    "imgs": [
                        "/img/download/WechatIMG9.png",
                        "/img/download/WechatIMG9.png"
                    ]
                }
            ]
         }
    }
    let number = result.data
    res.render("page/h5", {title : "h5模板", domain : domain, number: number})*/
})

app.get("/answer01",function(req, res){
    res.render("page/answer_01", {title : "新用户如何激活帐号？", domain : domain})
})
app.get("/answer02",function(req, res){
    res.render("page/answer_02", {title : "忘记密码了怎么办？", domain : domain})
})
app.get("/answer03",function(req, res){
    res.render("page/answer_03", {title : "如何快速找人？", domain : domain})
})
app.get("/question",function(req, res){
    res.render("page/question", {title : "帮助与反馈", domain : domain})
})

//h5下载页面
app.get("/download",function(req, res){
    res.render("page/download", {title : "Aeromind--APP下载", domain : domain})
})