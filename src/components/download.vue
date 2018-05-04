<template>
   <div class="form-box">
     <div class="nav">
      <div>
        <el-button type="primary" @click="toMain">首页</el-button>
        <el-button type="primary">下载页</el-button>
      </div>
    </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
         <template v-if="platObj">
            <el-tab-pane :key="index" v-for="(item, index) in platObj" :label="index" :name="index">{{ index }}</el-tab-pane>
         </template>
      </el-tabs>
      <template v-if="platObj">
         <el-form :key="index" v-show="activeName===index" label-width="140px" class="button-line" v-for="(item, index) in platObj">
            <el-form-item class="item" label="下载标题" >
               <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item class="item" label="下载简介">
               <el-input v-model="item.summary"></el-input>
            </el-form-item>
            <el-form-item class="item" label="安装包大小">
               <el-input v-model="item.size"></el-input>
            </el-form-item>
            <el-form-item class="item" label="安装包版本">
               <el-input v-model="item.version"></el-input>
            </el-form-item>
            <el-form-item class="item" label="安装包适用系统">
               <el-input v-model="item.system"></el-input>
            </el-form-item>
            <el-form-item class="item" label="发布日期">
               <el-date-picker
                  v-model="item.time"
                  type="date"
                  placeholder="选择日期">
               </el-date-picker>
            </el-form-item>
            <el-form-item class="item" label="下载地址">
               <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item class="item" label="下载背景图">
               <el-input v-model="item.backgroundPic" disabled></el-input>
               <el-upload
                  class="upload"
                  name="pic"
                  action="/cms_api/super/uploadImg"
                  :show-file-list="false"
                  :on-success="uploadSuccess">
                  <el-button type="primary" icon="edit"></el-button>
               </el-upload>
            </el-form-item>

            <h2>更新日志</h2>
            <template v-if="item.detail" v-for="(log, logIndex) in item.detail">
               <el-form-item class="item" label="日志标题">
                  <el-input v-model="log.title"></el-input>
                  <el-button type="primary" style="margin-left:20px;" @click="detailLog(logIndex)">
                     详情
                  </el-button>
                  <el-button type="primary" icon="minus" style="margin-left:20px;" @click="removeLog(logIndex)"></el-button>
                  <el-button type="primary" icon="plus" style="margin-left:20px;" @click="addLog(logIndex)"></el-button>
                  
               </el-form-item>
               <el-form-item class="item" label="版本号">
                  <el-input v-model="log.version"></el-input>
               </el-form-item>
               <el-form-item class="item" label="日志日期">
                  <el-date-picker
                     v-model="log.time"
                     type="date"
                     placeholder="选择日期">
                  </el-date-picker>
               </el-form-item>
            </template>

            <el-form-item>
               <el-button type="primary" @click="submitForm">保存</el-button>
               <a :href="'/cms_api/pre/download?version=' + $route.params.title" target="_blank">
                  <el-button type="button">预览</el-button>
               </a>
            </el-form-item>
         </el-form>
      </template>
   </div>
</template>
<script>
   import axios from '../router/axios'
	export default {
    data () {
      return {
         'platObj': null,
         'activeName': '',
         'isEdit': false
      }
    },
    async created () {
      let title = this.$route.params.title
      let { data } = await axios.get('/cms_api/getDownload', { params: { 'title': title } })

      if(data.data.windows.detail.length==0){
        data.data.windows.detail = [
          {
            "title": "",
            "time": "",
            "version":"",
            "list":[
              {
                "title":'',
                "summary":"",
                "imgs":[]
              }
            ]
          }
        ]
      }

      if(data.data.ios.detail.length==0){
        data.data.ios.detail = [
          {
            "title": "",
            "time": "",
            "version":"",
            "list":[
              {
                "title":'',
                "summary":"",
                "imgs":[]
              }
            ]
          }
        ]
      }

      if(data.data.android.detail.length==0){
        data.data.android.detail = [
          {
            "title": "",
            "time": "",
            "version":"",
            "list":[
              {
                "title":'',
                "summary":"",
                "imgs":[]
              }
            ]
          }
        ]
      }
      if(data.data.mac.detail.length==0){
        data.data.mac.detail = [
          {
            "title": "",
            "time": "",
            "version":"",
            "list":[
              {
                "title":'',
                "summary":"",
                "imgs":[]
              }
            ]
          }
        ]
      }
      this.platObj = data.data



      this.activeName = Object.keys(this.platObj)[0]
    },
    watch: {
      platObj: {
         handler (val, oldVal) {
            if(oldVal !== null) {
               this.isEdit = true
            }
         },
         deep:true
      }
    },
    methods: {
      toMain(){
        let title = this.$route.params.title
        this.$router.push({path:'/editor/main/'+ title})
      },
      addLog (index) {
         let detail = this.platObj[this.activeName].detail
         detail.splice(index + 1, 0, {
            "title": "",
            "time": "",
            "version":"",
            "list":[
               {
                  "title":'',
                  "imgs":[]
               }
            ]
         })
      },
      removeLog (index) {
         let detail = this.platObj[this.activeName].detail
         detail.splice(index, 1)
      },
      detailLog (index) {
         let detail = this.platObj[this.activeName].detail[index]
         if(detail.version === '') {
            return alert('请填写日志版本')
         }
         let version = detail.version
         let platform = this.activeName
         let title = this.$route.params.title
          this.$router.push({ 'path': `/editor/detail/${title}/${platform}/${version}` })
      },
      uploadSuccess (res) {
         this.platObj[this.activeName].backgroundPic = res.src
      },
      handleClick (tab, event) {
         //console.log(this.activeName)
      },
      async submitForm () {
         let obj = this.platObj[this.activeName]
         obj.time = new Date(obj.time).getTime()
         obj.detail.forEach((log) => {
            log.time = new Date(log.time).getTime()
         })
         let { data } = await axios.post('/cms_api/super/releaseDownload', {
            title: this.$route.params.title,
            plat: this.activeName,
            data: obj
         })
         if(data.code === 0) {
            this.isEdit = false
            alert('保存成功')
         } else {
            alert(data.msg)
         }
      }
    }
  }
</script>
<style>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
.nav{
  height:40px;
}
.nav>div{
  float: right;
}

.form-box{
  width:860px;
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
.button-line{
  border-bottom:1px solid #999;
}
.el-tabs__content {
   margin: 30px 0 30px;
}
.el-date-editor.el-input {
   width: 500px;
}
</style>
