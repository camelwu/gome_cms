const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const axios = require('axios')
const app = express()

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
function getdomain(req){
    return req.protocol +'://'+req.hostname
}

// 首页
app.get("/", function(req, res) {
    axios.get('http://'+ req.hostname +'/admin/getMainPage').then((r)=>{
        const cover = r.data.data
        res.render("index", {title : "首页", domain : getdomain(req), cover: cover})
    }).catch((err)=>{
        console.log(err)
    })
})
// 下载
app.get("/downloads", function(req, res) {
    axios.get('http://'+ req.hostname +'/admin/getDownload').then((r)=>{
        const banner = r.data.data
        if(!banner){
            return res.send({code:404})
        }
        const ver= {
            windows:banner.windows.detail,
            ios:banner.ios.detail,
            android:banner.android.detail,
            mac:banner.mac.detail
        }

        let time = ''
        if(banner.windows.time){
            time = new Date(banner.windows.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            banner.windows.time = str
        }

        if(banner.ios.time){
            time = new Date(banner.ios.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            banner.ios.time = str
        }

        if(banner.mac.time){
            time = new Date(banner.mac.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            banner.mac.time = str
        }

        if(banner.android.time){
            time = new Date(banner.android.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            banner.android.time = str
        }

        if(ver.windows.time){
            time = new Date(ver.windows.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            ver.windows.time = str
        }

        if(ver.ios.time){
            time = new Date(ver.ios.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            ver.ios.time = str
        }

        if(ver.mac.time){
            time = new Date(ver.mac.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            ver.mac.time = str
        }

        if(ver.android.time){
            time = new Date(ver.android.time)
            const str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
            ver.android.time = str
        }

        let str = ''
        let win = ver.windows
        let ma = ver.mac
        let io = ver.ios
        let and = ver.android
        win.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<win.length;i++){
            if(win[i].time){
                time = new Date(win[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                win[i].time = str
            }
        }

        ma.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<ma.length;i++){
            if(ma[i].time){
                time = new Date(ma[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                ma[i].time = str
            }
        }
        io.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<io.length;i++){
            if(io[i].time){
                time = new Date(io[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                io[i].time = str
            }
        }
        and.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<and.length;i++){
            if(and[i].time){
                time = new Date(and[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                and[i].time = str
            }
        }

        res.render("page/main", {title : "下载", domain : getdomain(req), banner: banner, ver: ver})
    }).catch((err)=>{
        console.log(err)
    })
    
})
// 关于我们
app.get("/aboutus", function(req, res) {
    res.render("page/about", {title : "公司介绍", domain : getdomain(req), para: '0'})
})
// 联系我们
app.get("/contractus", function(req, res) {
    res.render("page/about", {title : "联系我们", domain : getdomain(req), para: '1'})
})
// 常见问题
app.get("/faq", function(req, res) {
    res.render("page/more", {title : "常见问题", domain : getdomain(req), para: '0'})
})
// 服务协议
app.get("/terms", function(req, res) {
    res.render("page/more", {title : "服务协议", domain : getdomain(req), para: '1'})
})
// 隐私政策
app.get("/privacy", function(req, res) {
    res.render("page/more", {title : "隐私政策", domain : getdomain(req), para: '2'})
})
// 列表
app.get("/versionList", function(req, res) {
    axios.get('http://'+ req.hostname +'/admin/getVersionList').then((r)=>{
        const vers = r.data.msg

        let time = ''
        let str = ''
        let win = vers.windows
        let ma = vers.mac
        let io = vers.ios
        let and = vers.android

        win.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<win.length;i++){
            if(win[i].time){
                time = new Date(win[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                win[i].time = str
            }
        }

        ma.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<ma.length;i++){
            if(ma[i].time){
                time = new Date(ma[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                ma[i].time = str
            }
        }

        io.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<io.length;i++){
            if(io[i].time){
                time = new Date(io[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                io[i].time = str
            }
        }
        and.sort(function(n1,n2){
            return n2.time - n1.time;
        })
        for(var i=0;i<and.length;i++){
            if(and[i].time){
                time = new Date(and[i].time)
                str = time.getFullYear() + '-' + (time.getMonth()+1) + '-' + time.getDate()
                and[i].time = str
            }
        }
        res.render("page/versionList", {title : "Version update list", domain:getdomain(req), vers: vers })
    }).catch((err)=>{
        console.log(err)
        res.send({code:404})
    })
})
// 日志
app.get("/updates/:ver", function(req, res) {
    const ver = req.params.ver
    const platform = ver.split('-')[0]
    const activeVersion = ver.split('-')[1]

    axios.get('http://'+ req.hostname +'/admin/getVersionDetail?version='+activeVersion+'&platform='+platform).then((r)=>{
        const detail = r.data.data
        let str = ''
        let time = ''
        if(detail.time){
            time = new Date(detail.time)

            str = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()

            detail.time = str
        }

        res.render('page/version', {title : "隐私政策", domain : getdomain(req), detail: detail})
    }).catch((err)=>{
        console.log(err)
    })

    /*if (true) {
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
        res.render('page/version', {title : "隐私政策", domain : getdomain(req), 'ver': req.params.ver, detail: detail})
    } else {
        res.redirect('/')
    }*/
})
//h5模板
///html5/V1.3.0
app.get("/html5/:ver", function(req, res) {
    const ver = req.params.ver

    axios.get('http://'+ req.hostname +'/admin/getVersionDetail',
        {params:{
            version: ver,
            platform: 'ios'
        }}).then((r)=>{

        const number = r.data.data
        let titleArr = number.title.split(' ')
        for (let i = 0; i < titleArr.length; i++) {
            if(titleArr[i].toLowerCase() == 'ios'){
                number.title = titleArr[i+1]
                break;
            }
        }
        res.render("page/h5", {title : "h5模板", domain : getdomain(req), number: number, version:ver})

    }).catch((err)=>{
        console.log(err)
    })
    // let result = {
    //     "code": 0,
    //     "msg": "OK",
    //     "data": {
    //         "version":'V2.0.0',
    //         "title": 'Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！',
    //         "time": "2017-10-10",
    //         "detail": [
    //             {
    //                 "title": "Aeromind1.3.0 for Windows 我们正式更名为“Aeromind”啦！",
    //                 "introduction":"大家期盼已久的文件传输功能终于上线！经产品汪们反复调研实践，将文件传输上限定为500M，并将文件格式扩展，现能支持更多",
    //                 "imgs": [
    //                     "/img/download/WechatIMG9.png",
    //                     "/img/download/WechatIMG9.png"
    //                 ]
    //             }
    //         ]
    //      }
    // }
    // let number = result.data
})
// answer和question模板
app.get("/answer01",function(req, res){
    res.render("page/answer_01", {title : "新用户如何激活帐号？", domain : getdomain(req)})
})
app.get("/answer02",function(req, res){
    res.render("page/answer_02", {title : "忘记密码了怎么办？", domain : getdomain(req)})
})
app.get("/answer03",function(req, res){
    res.render("page/answer_03", {title : "如何快速找人？", domain : getdomain(req)})
})
app.get("/question",function(req, res){
    res.render("page/question", {title : "帮助与反馈", domain : getdomain(req)})
})
//h5下载页面
app.get("/download",function(req, res){
    res.render("page/download", {title : "Aeromind--APP下载", domain : getdomain(req)})
})
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

