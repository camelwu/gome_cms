<template>
  <div class="list">
    <el-table
      :data="tableList"
      style="width:650px;margin:0 auto;"
      border>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="title"
        label="版本"
        width="100">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="time"
        label="上线时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作">
        <template  slot-scope="scope">
          <el-button type="text" v-if="scope.row.active == 2" @click="agree(scope.row.title)">通过</el-button>
          <el-button type="text" v-if="scope.row.active == 2" @click="refuse(scope.row.title)">拒绝</el-button>
          <a class="pre" target="_blank" :href="'/admin/pre?version='+scope.row.title">预览</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from '../router/axios'
export default {
  data () {
    return {
      versions: []
    }
  },
  computed:{
    tableList(){
      const arr = []
      this.versions.map((item)=>{
        let state = '已提交'
        let date = ''
        if(item.active == 2){
          state = '已提交'
          if(item.time > 0){
            const oDate = new Date(item.time)
            date = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate()
          }
          arr.push({
            time: date,
            state: state,
            active: item.active,
            title: item.title
          })
        }else if(item.active == 3){
          state = '已发布'
          if(item.time > 0){
            const oDate = new Date(item.time)
            date = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate()
          }
          arr.push({
            time: date,
            state: state,
            active: item.active,
            title: item.title
          })
        }
        
      })
      return arr
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      axios.get('/admin/super/getCreateVersion').then((res)=>{
        console.log(res)
        const data = res.data
        this.versions = data.versions
      })
    },
    agree(title){
      this.$confirm('确定上线此版本吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        axios.post('/admin/super/vagree',{title:title}).then((res)=>{
          this.getList()
        }).catch((err)=>{
          alert('上线失败')
          console.log(err)
        })
      }).catch(()=>{})
    },
    refuse(title){
      this.$confirm('拒绝此版本上线吗？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
         axios.post('/admin/super/vrefuse',{title:title}).then((res)=>{
          this.getList()
        }).catch((err)=>{
          alert('拒绝失败')
          console.log(err)
        })
      }).catch(()=>{})
    }
  }
}
</script>

<style scoped>
  .list{
    text-align: center;
  }
  .add{
    width:82px; 
    height:82px;
    font-size: 100px;
    line-height: 82px;
    color: #20a0ff;
    cursor: pointer;
  }
  .pre{
    font-size: 14px;
    color: #20a0ff;
    text-decoration: none;
    margin-left:10px;
  }
</style>