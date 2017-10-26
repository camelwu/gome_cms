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
router.get('/getMain',(req, res)=>{
	res.send({
	    "code": 0,
	    "msg": "OK",
	    "data": {
	    	"version":'V2.0.0',
	        "cover": {
	            "opacityLogo": "/img/T1SRKTBQAv1RCvBVdK.png",
	            "logo": "/img/T1SRKTBQAv1RCvBVdK.png",
				"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png",
				"sPic": "/img/T1SRKTBQAv1RCvBVdK.png"
	        },
	        "introduction": [
	            {
	                "pic": "/img/T1SRKTBQAv1RCvBVdK.png",
	                "title": "支持万人企业通讯录",
	                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。",
	                "detail": {}
	            },
	            {
	                "pic": "/img/T1SRKTBQAv1RCvBVdK.png",
	                "title": "支持万人企业通讯录",
	                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。",
	                "detail": {}
	            },
	            {
	                "pic": "/img/T1SRKTBQAv1RCvBVdK.png",
	                "title": "支持万人企业通讯录",
	                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。",
	                "detail": {}
	            }
	        ],
			"feature": {
				"title": "",
				"subTitle": "",
				"list": [
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
					},
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
					},
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
					},
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
					},
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
					},
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
					},
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
					},
					{
						"pic" : "/img/T1SRKTBQAv1RCvBVdK.png",
						"title": "支持万人企业通讯录",
		                "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
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
					},
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
						"pic2": "",
						"url" : ""
					}
				]
			}
	    }
	})
})

//下载banner部分
router.get('/getDownload',(req, res)=>{
	let title = req.query.version
	VersionModel.findOne({title:title}).then((version)=>{
		console.log(version)
	}).catch((err)=>{
		//res.send({code:"10500", msg:"system err"})
	})
	const platform = req.query.platform
	const platformData = []
	const Windows = {
	 	"platform": "Windows",
    	"title": "Aeromind Windows版",
        "summary": "便捷、高效、迅速",
        "size": "30.2 M",
        "version": "V2.0.0",
        "system": "Windows4.0及以上",
		"time": "2017-10-10",
		"url": 'http://.....',
		"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
    }
    const Mac = {
	 	"platform": "Mac",
    	"title": "Aeromind Mac版",
        "summary": "便捷、高效、迅速",
        "size": "30.2 M",
        "version": "V2.0.0",
        "system": "Mac4.0及以上",
		"time": "2017-10-20",
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
		"time": "2017-10-30",
		"backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
    }
    const iOS = {
	 	"platform": "iOS",
    	"title": "Aeromind iOS版",
        "summary": "便捷、高效、迅速",
        "size": "30.2 M",
        "version": "V2.0.0",
        "system": "iOS4.0及以上",
		"time": "2017-11-10",
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
	const version = req.query.version
	const platform = req.query.platform

	res.send({
	    "code": 0,
	    "msg": "OK",
	    "data": {
	    	"version":'V2.0.0',
	    	"title": 'Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！',
	    	"time": "2017-10-10",
	    	"detail": [
				{
	    			"title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
					"imgs": [
						"/img/a.png",
						"/img/b.png"
					]
		        }
	    	]
	    }
	})
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
			return res.send({code:"10405",msg:"title 重复"})
		}
		VersionModel.findOne({active:6}).then((version)=>{
			if(version){
				new VersionModel({
					"title": title,
					"active": 1,
				    "cover": version.cover,
				    "introduction": version.introduction,
				    "feature":version.feature,
				    "downloadEnter": version.downloadEnter,
				    "winoows": version.windows,
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
						"sPic": ""
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
								"pic2": "",
								"url" : ""
							},{
								"pic1": "",
								"pic2": "",
								"url" : ""
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
						"detail":[]
					},
				    "ios": {
						"title": "",
				        "summary": "",
				        "size": "",
				        "version": "",
				        "system": "",
						"time": 0,
						"url": '',
						"backgroundPic": "",
						"detail":[]
					},
				    "mac": {
				    	"title": "",
			            "summary": "",
			            "size": "",
			            "version": "",
			            "system": "",
						"time": 0,
						"backgroundPic": "",
						"detail":[]
				    },
				    "android": {
				    	"title": "",
			            "summary": "",
			            "size": "",
			            "version": "",
			            "system": "",
						"time": 0,
						"backgroundPic": "",
						"detail":[]
				    }
				}).save((err, version)=>{
					if(err){
						return res.send({code:"10500",msg:"system err"})
					}
					res.send({code:"0",msg:"ok",data:{title: title, active: 1}})
				})
			}
		}).catch((err)=>{
			console.log(err)
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
    
    res.send({msg:'ok',code:0, src: '/assets/' + newFileName ,name: req.file.originalname})
})
//主页信息
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
				res.send({code: 0, msg:"此版本上线成功"})
			}).catch((err)=>{
				res.send({code:"10500", msg:"system err"})
			})
		}
	}).catch((err)=>{
		res.send({code:"10500", msg:"system err"})
	})
})

router.get('/super/signup',(req, res)=>{
	new UserModel({
		username: "test",
		password: "123.gome",
		isSuper: false
	}).save(()=>{
		res.send({code:0,msg:"ok"})
	})
})
//router.use	
/**/
router.post('/super/releaseDownload', aeromind, (req, res) => {
	console.log(req.body)
	res.send({code: 200, msg:"ok"})
})

app.use('/admin', router)