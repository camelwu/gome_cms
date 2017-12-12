const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const axios = require('axios')
const proxy = require('http-proxy-middleware')
const app = express()

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')
app.use('/css', express.static('views/css'))
app.use('/versionList', express.static('views/versionList'))
app.use('/js', express.static('views/js'))
app.use('/page', express.static('views/page'))


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
    let hn = req.hostname
    if (hn.indexOf('gomeplus')>-1){
        return 'https://'+req.hostname
    }else{
        return 'https://oa.aeromind.cn'
    }
}
function get_api(req){
    // return req.protocol+req.hostname+'/cms_api'
    let hn = req.hostname
    if (hn.indexOf('.cn')>-1 || hn.indexOf('.com')>-1 || hn.indexOf('.org')>-1) {
        return req.protocol+req.hostname+'/cms_api'
    }else{
        return req.protocol+'localhost:3005/cms_api'
    }
}
// 首页
app.get("/", function(req, res) {
    axios.get(get_api(req)+'/getMainPage').then((r)=>{
        const cover = r.data.data
        res.render("index", {title : "首页", domain : getdomain(req), cover: cover})
    }).catch((err)=>{
        console.log(err)
    })
})
// 下载
app.get("/downloads", function(req, res) {
    axios.get(get_api(req)+'/getDownload').then((r)=>{
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
app.get("/contactus", function(req, res) {
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
    axios.get(get_api(req)+'/getVersionList').then((r)=>{
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

    axios.get(get_api(req)+'/getVersionDetail?version='+activeVersion+'&platform='+platform).then((r)=>{
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
})
//h5模板
///html5/V1.3.0
app.get("/html5/:ver", function(req, res) {
    const ver = req.params.ver

    axios.get(get_api(req)+'/getVersionDetail',
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

