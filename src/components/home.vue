<template>
  <div>
    <el-card class="card" v-for="(item, index) in versions" :key="index" :body-style="{ padding: '0px',background: item.active==2?'#996':''}" >
      <div style="padding: 14px;">
        <span>{{item.title}}</span>
        <div class="bottom clearfix" :class="[item.active == 0 ? colors: '']">
          <el-button type="text" class="button" @click="editorV(item.title)">编辑</el-button>
          <el-button type="text" class="button" v-if="item.active !== 2" @click="toOnline(item.title)">发布</el-button>
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
import axios from '../router/axios'
export default {
  data () {
    return {
      versions: [],
      colors: "colors"
    }
  },
  created(){
    axios.get('/admin/super/getCreateVersion').then((res)=>{
      console.log(res)
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
          console.log(res)
          const data = res.data
          if(data.code == 0){
            this.versions.push(data.data)
          }else{
            alert(data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }).catch(()=>{});
    },
    deleteVersion(title){
      this.$confirm('确定删除此项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('/admin/super/deleteVersion',{title:title}).then((res)=>{
          const data = res.data
          if(data.code == 0){

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            alert(data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 2000
        });          
      })
    },
    toOnline(title){
      axios.post('/admin/super/releaseVersion',{title:title}).then((res)=>{
        const data = res.data
        if(data.code != 0){
          return alert(data.msg)
        }
        alert("发布成功")
      }).catch((err)=>{
        console.log(err)
      })
    },
    editorV(title){
      //this.$router.push({path:'/editor/main/'+title})
      this.$router.push({path:'/editor/detail/'+title+'/windows/V1.2.0'})
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
  .colors button{
    color: #000;
  }
</style>