<template>
	<div>
		 <el-input type="textarea" v-model="j"></el-input>
		 <el-button type="primary" @click="submit">立即创建</el-button>
	</div>
</template>
<script>
import axios from '../router/axios.js'
export default {
	data(){
		return {
			j:''
		}
	},
	methods:{
		submit(){
			const json = JSON.stringify(this.j)
			console.log(json)

			axios.post('/admin/super/all',{
				data: json
			}).then((res)=>{
				const data = res.data
				if(data.code == 0){
					alert('导入成功')
				}else{
					alert(data.msg)
				}
			}).catch((err)=>{
				alert(err)
			})
		}
	}
}
</script>
<style>
	
</style>