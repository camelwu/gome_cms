import axios from 'axios'
import app from '../main'

axios.interceptors.response.use((res) => {
	if(res.data.code == 10401){
		console.log(res.data.code)
		alert("登录失效，请重新登录")
		app.$router.push({path:"/"})	
	}
	return res
}, (err) => {
	return Promise.reject(err)
})

export default axios