const express = require('express')
const path = require('path')
const port = 3005
const app = express()

app.listen(port,()=>{
	console.log('server is working')
})

app.use(express.static(path.join(__dirname, 'dist')));

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
			"platform": {
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
//主页信息
router.post('/main')
//router.use
app.use('/admin', router)