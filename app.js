const express = require('express')
const path = require('path')
const ejs = require('ejs')
const port = 12345
const app = express()

app.listen(port,()=>{
	console.log('server is working')
})
app.set('views', path.join(__dirname, 'views/pages'));  
app.engine('html', ejs.renderFile);
app.set('view engine', 'html'); 

app.use(express.static(path.join(__dirname, 'views')));

//路由
const router = express.Router()

//router.use
app.get('/admin',(req,res)=>{
	res.render('index')
})