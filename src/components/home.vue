<template>
  <div v-if="tableList.length" class="list">
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
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template  slot-scope="scope">
          <el-button type="text" v-if="scope.row.title" @click="editorV(scope.$index)">编辑</el-button>
          <el-button type="text" v-if="scope.row.active !== 3 && scope.row.active" @click="toOnline(scope.row.title)">提交</el-button>
          <a class="pre" target="_blank"  v-if="scope.row.title" :href="'/cms_api/pre?version='+scope.row.title">预览</a>
          <el-button class="add" type="text" v-if="scope.$index == 0" @click="setV">添加</el-button>
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
      if(this.versions.length == 0){
        return [{
          time: '',
          state: '',
          active: '',
          title: ''
        }]
      }
      return this.versions.map((item)=>{
        let state = '待提交'
        if(item.active == 2){
          state = '已提交'
        }else if(item.active == 3){
          state = '已发布'
        }else if(item.active == 4){
          state = '未通过'
        }
        let date = ''
        if(item.time > 0){
          const oDate = new Date(item.time)
          date = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + oDate.getDate()
        }
        return {
          time: date,
          state: state,
          active: item.active,
          title: item.title
        }
      })
    }
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      axios.get('/cms_api/super/getCreateVersion').then((res)=>{
        console.log(res)
        const data = res.data
        this.versions = data.versions
      })
    },
    setV(){
      this.$prompt('请输入版本信息(字数不超过12个)',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^V\d{1,5}(\.\d{1,5}){2}$/,
        inputErrorMessage: '版本格式不正确，例： V1.2.3'
      }).then(({ value }) => {
        axios.post('/cms_api/super/createVersion',{title:value}).then((res)=>{
          const data = res.data
          if(data.code == 0){
            this.versions.unshift(data.data)
            console.log(this.versions)
          }else{
            alert(data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }).catch(()=>{});
    },
    toOnline(title){
      axios.post('/cms_api/super/releaseVersion',{title:title}).then((res)=>{
        const data = res.data
        if(data.code != 0){
          return alert(data.msg)
        }
        alert("提交成功")
        this.getList()
      }).catch((err)=>{
        console.log(err)
      })
    },
    editorV(index){
      if(this.tableList[index].active == 2){
        this.$confirm('此版本正在等待审核，如果修改内容，将会被撤回提交, 确定编辑吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path:'/editor/main/'+ this.tableList[index].title})
        }).catch(() => {})
      }else{
        this.$router.push({path:'/editor/main/'+ this.tableList[index].title})
      }
    }
  }
}
</script>

<style scoped>
  .list{
    text-align: left;
  }
  .card{
    float:left;
    margin:20px;
  }
  .add{    
    color: #20a0ff;
    cursor: pointer;
    margin-left:10px;
  }
  .pre{
    font-size: 14px;
    color: #20a0ff;
    text-decoration: none;
    margin-left:10px;
  }
</style>