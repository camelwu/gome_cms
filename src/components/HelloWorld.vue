<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-form label-width="100px">
      <el-form-item label="用户名" prop="checkPass">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "../router/axios"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'gome cms',
      username:'',
      password:''
    }
  },
  methods:{
    submitForm(){
      axios.post('/cms_api/super/login',{username:this.username, password: this.password}).then((res)=>{
        const data = res.data
        if(data.code != 0){
          return alert(data.msg)
        }
        if(data.isSuper){
          return this.$router.push({path:'/v-home'})
        }
        this.$router.push({path:'/home'})
      })
    },
    createVersion(){
<<<<<<< HEAD
      axios.post('/admin/super/createVersion').then((res)=>{
=======
      axios.post('/cms_api/super/createVersion').then((res)=>{
>>>>>>> 485745a8d30d0fd78e8e154e6f546eab3dafd339
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.hello{
  margin: 0 auto;
  width: 400px;
}
</style>
