const express = require('express')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const app = express()
const domain = 'https://work.gomeplus.com/'

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'html')
app.use('/css', express.static('views/css'))
app.use('/js', express.static('views/js'))
const lobj = {
	windows: 'windows',
	mac: '苹果Mac',
	and: '安卓',
	ios: '苹果'
}
/* 
开始获取数据并，路由
*/
// 首页
app.get("/", function(req, res) {
	let result = {}
    res.render("index", {title : "首页", domain : domain})
})
// 下载
app.get("/downloads", function(req, res) {
    res.render("page/main", {title : "下载", domain : domain})
})
// 关于我们
app.get("/aboutus", function(req, res) {
    res.render("page/about", {title : "关于我们", domain : domain, para: '0'})
})
// 联系我们
app.get("/contactus", function(req, res) {
    res.render("page/about", {title : "联系我们", domain : domain, para: '1'})
})
// 常见问题
app.get("/faq", function(req, res) {
    res.render("index", {title : "常见问题", domain : domain})
})
// 服务协议
app.get("/terms", function(req, res) {
    res.render("index", {title : "服务协议", domain : domain})
})
// 隐私政策
app.get("/privacy", function(req, res) {
    res.render("page/version", {title : "隐私政策", domain : domain})
})
// 日志
app.get("/updates/:ver", function(req, res) {
    if (true) {
        res.render('page/version', {title : "隐私政策", domain : domain, 'ver': req.params.ver})
    } else {
        res.redirect('/')
    }
    
    // res.render("index", {title : "", domain : domain})
})
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

