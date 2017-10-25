<template>
  <div class="form-box">
	 <el-form label-width="140px" class="button-line" v-for="(item , index) in list" :key="index">
        <el-form-item class="item" label="标题">
         <el-input v-model="item.title"></el-input>
        <el-button type="primary" icon="minus" style="margin-left:20px;"></el-button>
        <el-button type="primary" icon="plus"></el-button>
        </el-form-item>
        <el-form-item class="item" label="图片" v-for="(url, count) in item.imgs" :key="count">
          <el-input v-model="item.imgs[count]" disabled></el-input>
          <el-upload
            class="upload"
            name="pic"
            action="/admin/super/uploadImg"
            :show-file-list="false"
            :on-success="uploadSuccess(index,count)">
            <el-button type="primary" icon="edit"></el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('banner')">保存</el-button>
          <el-button type="primary" @click="preView">预览</el-button>
        </el-form-item>
      </el-form>
                
  </div>
</template>

<script>
import axios from '../router/axios'
export default {
  data () {
    return {
      title:'',
      platform:'',
      version:'',
      list:[
      	{
      		title:'',
      		imgs:[]
      	}
      ]
    }
  },
  created(){
    const title = this.$route.params.title 
    const platform = this.$route.params.platform
    const version = this.$route.params.version

    this.title = title 
    this.platform = platform
    this.version = version 

    console.log(title, platform, version) 
    axios.get('/admin/getVersionDetail',{
    	params:{
    		title: title, 
		    platform: platform,
		    version: version 
    	}
	}).then((res)=>{
    	const data = res.data
    	console.log(data)

    	const list = data.data.map((item)=>{
    		item.imgs.push("")
    		return item
    	})
		this.list = list
    	
    }).catch((err)=>{
    	console.log(err)
    })
  },
  methods:{
   uploadSuccess(index,count){
		return (res,file)=>{
			if(res.code == 10401){
				alert('登录失效，请重新登录')
				return this.$router.push({path:'/'})
			}
			if(res.code != 0){
				return alert(res.msg)
			}
			const len = this.list[index].imgs.length
			this.list[index].imgs.splice(len-1,0,res.src)
		}
   },
   submitForm(){
   	 const list = this.list.map((item)=>{
   	 	const imgs = []
   	 	item.imgs.map((item)=>{
 			if(item){
 				imgs.push(item)
 			}
 			return item
 		})
   	 	return {
   	 		title: item.title,
   	 		imgs: imgs
   	 	}
   	 })
   	 axios.post('/admin/super/setDetail',{
   	 	title: this.title,
   	 	list: list,
   	 	version: this.version,
   	 	platform: this.platform
   	 }).then((res)=>{
   	 	const data = res.data 
   	 	console.log(data)
   	 	if(data.code !=0){
   	 		return alert(data.msg)
   	 	}

   	 }).catch((err)=>{
   	 	console.log(err)
   	 })
   },
   preView(){}
  }
}
</script>

<style scoped>
 a {
  color: #42b983;
}
.form-box{
  width:800px;
  margin:0 auto;
}
.item>div>div{
  width:500px;
  float:left;
}
.item>div>button{
  float: right;
}

.item .upload{
  width:46px;
  float:right;
}
</style>