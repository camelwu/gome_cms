const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require("express-session")
mongoose.promise = require('bluebird')
const UserModel = require('./db/model/user')
const VersionModel = require('./db/model/version')
const path = require('path')
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
		res.send({code:0, msg:'ok'})
	}).catch((err)=>{
		res.send({code:'10500', msg:"system err"})
	})
})
//创建版本
router.post('/super/createVersion',aeromind,(req, res)=>{
	const title = req.body.title
	console.log(title)
	return res.send({title:title})
	VersionModel.findOne({active:2}).then((version)=>{

		if(version){
			new VersionModel({
				"title": String,
				"active": 1,
			    "cover": version.cover,
			    "introduction": version.introduction,
			    "feature":version.feature,
			    "downloadEnter": version.downloadEnter,
			    "winoows": version.windows,
			    "ios": version.ios,
			    "mac": version.mac,
			    "adroid": version.adroid
			}).then((version)=>{
				res.send({code:"10500",msg:"system err"})
			}).catch((err)=>{
				res.send({code:"10500",msg:"system err"})
			})
		}else{

		}
	}).catch((err)=>{
		console.log(err)
	})

	res.send({code:0,msg:'ok',data:{title:title,active:1}})
})
//获取版本
router.post('/super/getCreateVersion', aeromind, (req, res)=>{
	VersionModel.find().then((versions)=>{
		versions.map((item)=>{
			return {title:item.title,active:item.active}
		})
		res.send({code:0, versions:versions})
	}).catch((err)=>{
		res.send({code:"10500",msg:"system err"})
	})
})

//router.use	
/*new UserModel({
username: "aeromind",
password: "123.gome",
isSuper: false
}).save(()=>{
})*/

app.use('/admin', router)