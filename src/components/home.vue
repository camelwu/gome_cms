<template>
  <div>
    <el-card class="card" :body-style="{ padding: '0px'}" v-for="(item, index) in versions" :key="index">
      <div style="padding: 14px;">
        <span>{{item.title}}</span>
        <div class="bottom clearfix">
          <el-button type="text" class="button">编辑</el-button>
          <el-button type="text" class="button">发布</el-button>
          <el-button type="text" class="button">删除</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="card" :body-style="{ padding: '0px'}">
      <div class="add" @click="setV">
        +
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      versions: []
    }
  },
  created(){
    axios.post('/admin/super/getCreateVersion').then((res)=>{
      const data = res.data
      this.versions = data.versions
    })
  },
  methods:{
    setV(){
      this.$prompt('请输入版本信息(字数不超过12个)',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,12}$/,
        inputErrorMessage: '版本信息不正确'
      }).then(({ value }) => {
        axios.post('/admin/super/createVersion',{title:value}).then((res)=>{
          const data = res.data
          console.log(data)
          if(data.code == 0){
            this.versions.push(data.data)
          }
        }).catch((err)=>{
          alert(err)
        })
      }).catch(()=>{});
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