const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
//const axios = require('axios')
const app = express()
const domain = 'https://local/'

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')
app.use('/css', express.static('views/css'))
app.use('/versionList', express.static('views/versionList'))
app.use('/js', express.static('views/js'))
app.use('/page', express.static('views/page'))

const lobj = {
	windows: 'windows',
	mac: '苹果Mac',
	and: '安卓',
	ios: '苹果'
}
// const ajax = axios.create({
//   baseURL: 'http://localhost',
//   timeout:1000*3,
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
//     'X-Requested-with':'XMLHttpRequest'

//   },
//   proxy:{
//     host:"127.0.0.1",
//     port:3005,
//     auth:{
//       username:'cdd',
//       password:'123456'
//     }
//   }
// })


// 首页
app.get("/", function(req, res) {
	let home = {
        "code": 0,
        "msg": "OK",
        "data": {
            "cover": {
                "opacityLogo": "/img/T1SRKTBQAv1RCvBVdK.png",
                "logo": "/img/T1SRKTBQAv1RCvBVdK.png",
                "backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png",
                "sPic": "/img/T1SRKTBQAv1RCvBVdK.png"
            },
            "introduction": [
                {
                    "pic": "/img/website/talk.png",
                    "title": "支持万人企业通讯录",
                    "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
                }
            ],
            "feature": {
                "title": "",
                "subTitle": "",
                "list": [
                    {
                        "pic" : "/img/website/people.png",
                        "title": "支持万人企业通讯录",
                        "summary": "企业通讯录支持一人多职务、多团队、多级组织架构，隐藏指定高管手机号。"
                    }
                ]
            },
            "download": {
                "title": "",
                "subTitle": "",
                "list": [
                    {
                        "pic1": "/img/website/win-2x.png",
                        "pic2": "/img/website/xiazai.png",
                        "url" : ""
                    },
                    {
                        "pic1": "/img/website/win-2x.png",
                        "pic2": "/img/website/xiazai.png",
                        "url" : ""
                    }
                ]
            }
        }
    }
    let cover = home.data
    res.render("index", {title : "首页", domain : domain, cover: cover})
})
// 下载
app.get("/downloads", function(req, res) {
    let result = {
        "code": 0,
        "msg": "OK",
        "data": {
            "version":'V2.0.0',
            "windows":{
                "title": "Aeromind windows版",
                "summary": "便捷、高效、迅速",
                "size": "30.2 M",
                "version": "V2.0.0",
                "system": "Android4.0及以上",
                "time": "2017-10-10",
                "url": 'http://.....',
                "backgroundPic": "/img/download/windowsBanner.png"
            },
            "mac":{
                "title": "Aeromind Mac版",
                "summary": "便捷、高效、迅速",
                "size": "30.2 M",
                "version": "V2.0.0",
                "system": "Android4.0及以上",
                "time": "2017-10-10",
                "url": 'http://.....',
                "backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
            },
            "android":{
                "title": "Aeromind Android版",
                "summary": "便捷、高效、迅速",
                "size": "30.2 M",
                "version": "V2.0.0",
                "system": "Android4.0及以上",
                "time": "2017-10-10",
                "backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
            },
            "ios":{
                "title": "Aeromind ios版",
                "summary": "便捷、高效、迅速",
                "size": "30.2 M",
                "version": "V2.0.0",
                "system": "Android4.0及以上",
                "time": "2017-10-10",
                "backgroundPic": "/img/T1SRKTBQAv1RCvBVdK.png"
            }
        }
    }
    let banner = result.data
    let versionList = {
        "code": 0,
        "msg": "OK",
        "data": {
            "windows": [
                {
                    "title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.1"
                },
                {
                    "title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.0"
                },
                {
                    "title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.0.9"
                }
            ],
            "mac": [
                {
                    "title": "Aeromind1.3.0 for Mac 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.1"
                },
                {
                    "title": "Aeromind1.3.0 for Mac 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.0"
                },
                {
                    "title": "Aeromind1.3.0 for Mac 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.0.9"
                }
            ],
            "android": [
                {
                    "title": "Aeromind1.3.0 for Android 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.1"
                }
            ],
            "ios": [
                {
                    "title": "Aeromind1.3.0 for Ios 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.1"
                }
            ]
        }
    }
    let ver= versionList.data
    res.render("page/main", {title : "下载", domain : domain, banner: banner, ver: ver})
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
// 列表
app.get("/versionList", function(req, res) {
    let version = {
        "code": 0,
        "msg": "OK",
        "data": {
            "windows": [
                {
                    "title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.1"
                },
            ],
            "mac": [
                {
                    "title": "Aeromind1.3.0 for mac 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.1"
                },
            ],
            "android": [
                {
                    "title": "Aeromind1.3.0 for android 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.1.1"
                },
            ],
            "ios":[
                {
                    "title": "Aeromind1.3.0 for ios 我们正式更名为“Aeromind”啦！",
                    "time": "2017-10-10",
                    "version": "V1.3.0"
                },
                {
                    "title": "Aeromind1.3.0 for ios 我们正式更名为啦！",
                    "time": "2017-10-10",
                    "version": "V1.3.0"
                }
            ]
        }
    }
    let vers = version.data
    res.render("versionList/versionList", {title : "Version update list", domain, vers: vers })
})
// 日志
app.get("/updates/:ver", function(req, res) {
    let ver = req.params.ver.toLowerCase()
    let ary = ver.split('-')
    // if(ary[0] in [windows,mac,ios,android]){
    //     let v = ver.substring("-").test(v(/\d).(\d).(\d)/))
    // }
    /*
ary[o] in [windows,mac,ios,android]
1.1.1
v(\d).(\d).(\d)
    */
    if (true) {
        let result = {
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
                            "/img/download/WechatIMG9.png",
                            "/img/download/WechatIMG9.png"
                        ]
                    }
                ]
            }
        }
        let detail = result.data
        res.render('page/version', {title : "隐私政策", domain : domain, 'ver': req.params.ver, detail: detail})
    } else {
        res.redirect('/')
    }
})
//h5模板
app.get("/html5", function(req, res) {
    let result = {
        "code": 0,
        "msg": "OK",
        "data": {
            "version":'V2.0.0',
            "title": 'Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！',
            "time": "2017-10-10",
            "detail": [
                {
                    "title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
                    "introduction":"大家期盼已久的文件传输功能终于上线！经产品汪们反复调研实践，将文件传输上限定为500M，并将文件格式扩展，现能支持更多",
                    "imgs": [
                        "/img/download/WechatIMG9.png",
                        "/img/download/WechatIMG9.png"
                    ]
                }
            ]
         }
    }
    let number = result.data
    res.render("page/h5", {title : "h5模板", domain : domain, number: number})
})
// answer和question模板
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
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

