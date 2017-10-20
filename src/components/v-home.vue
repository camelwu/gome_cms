<template>
  <div>
    <el-card class="card" :body-style="{ padding: '0px'}" >
      <div style="padding: 14px;" v-if="!version">
        <span>暂无可上线内容</span>
      </div>
      <div v-if="version"  style="padding: 14px;">
        <span>{{version.title}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button">预览</el-button>
          <el-button type="text" class="button" @click="toOnline(version.title)">发布</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from '../router/axios'
export default {
  data () {
    return {
      version: {
        title:'',
        active: ''
      }
    }
  },
  created(){
   this.getList()
  },
  methods:{
    getList(){
      axios.get('/admin/super/v-getCreateVersion').then((res)=>{
        console.log(res)
        const data = res.data
        this.version = data.version
      })
    },
    toOnline(title){
      axios.post('/admin/super/v-releaseVersion',{title:title}).then((res)=>{
        const data = res.data
        if(data.code != 0){
          return alert(data.msg)
        }
        alert("发布成功")
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .card{
    float:left;
    margin:20px;
  }
  .add{
    width:82px; 
    height:82px;
    font-size: 100px;
    line-height: 82px;
    color: #20a0ff;
    cursor: pointer;
  }
</style>