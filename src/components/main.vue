<template>
  <div class="box">
    <div class="nav">
      <div>
        <el-button type="primary">
          首页
        </el-button>
        <el-button type="primary" @click="toDownload">
          下载页
        </el-button>
      </div>
    </div>
    <div class="form-box">
      <template v-if="banner">
        <h1>banner</h1>
        <el-form label-width="140px" class="button-line">
          <el-form-item class="item" label="白色底logo">
           <el-input v-model="banner.logo" disabled></el-input>
            <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('banner','logo')">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="item" label="透明底logo">
            <el-input v-model="banner.opacityLogo" disabled></el-input>
            <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('banner','opacityLogo')">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="item" label="大背景图片">
            <el-input v-model="banner.backgroundPic" disabled></el-input>
            <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('banner','backgroundPic')">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="item" label="模糊大背景图片">
            <el-input v-model="banner.blurBackgroundPic" disabled></el-input>
            <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('banner','blurBackgroundPic')">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="item" label="banner内图片">
            <el-input v-model="banner.smallPic" disabled></el-input>
            <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('banner','smallPic')">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
          </el-form-item>
          <el-form-item class="item" label="模糊banner内图片">
            <el-input v-model="banner.blurSmallPic" disabled></el-input>
            <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('banner','blurSmallPic')">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('banner')">保存</el-button>
            <a target="_blank" class="pre" :href='"/cms_api/pre?version="+ $route.params.title' @click="preView">预览</a>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="introduction">
        <h1>introduction</h1>
        <el-form label-width="140px" class="button-line" >
          <div v-for="(item, index) in introduction">
            <span>第{{index + 1}}组</span>
            <el-form-item class="item" label="图片">
              <el-input v-model="item.pic" disabled></el-input>
              <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('introduction','pic', index)">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
            </el-form-item>
            <el-form-item class="item" label="标题">
              <el-input v-model="item.title"></el-input>
            </el-form-item>
            <el-form-item class="item" label="简介">
              <el-input v-model="item.summary"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('introduction')">保存</el-button>
            <a target="_blank" class="pre" :href='"/cms_api/pre?version="+ $route.params.title' @click="preView">预览</a>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="feature">
        <h1>Aeromind 产品特色</h1>
        <el-form label-width="140px" class="button-line">
          <el-form-item class="item" label="大标题">
            <el-input v-model="feature.title"></el-input>
          </el-form-item>
          <el-form-item class="item" label="大简介">
            <el-input v-model="feature.subTitle"></el-input>
          </el-form-item>
          <div v-for="(names, index) in feature.list">
            <span>第{{index + 1}}组</span>
            <el-form-item class="item" label="图片">
              <el-input v-model="names.pic" disabled></el-input>
              <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('feature','pic', index)">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
            </el-form-item>
            <el-form-item class="item" label="标题" >
              <el-input v-model="names.title"></el-input>
            </el-form-item>
            <el-form-item class="item" label="简介">
              <el-input v-model="names.summary"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('feature')">保存</el-button>
            <a target="_blank" class="pre" :href='"/cms_api/pre?version="+ $route.params.title' @click="preView">预览</a>
          </el-form-item>
        </el-form>
      </template>
      <template v-if="download">
        <h1>多平台支持</h1>
        <el-form label-width="140px" class="button-line">
          <el-form-item class="item" label="大标题">
            <el-input v-model="download.title"></el-input>
          </el-form-item>
          <el-form-item class="item" label="大简介">
            <el-input v-model="download.subTitle"></el-input>
          </el-form-item>
          <div v-for="(item, index) in download.list">
            <span>第{{index + 1}}组</span>
            <el-form-item class="item" label="图片1">
              <el-input v-model="item.pic1" disabled></el-input>
              <el-upload
              class="upload"
              name="pic"
              action="/cms_api/super/uploadImg"
              :show-file-list="false"
              :on-success="uploadSuccess('download','pic1', index)">
              <el-button type="primary" icon="edit"></el-button>
            </el-upload>
            </el-form-item>
            <el-form-item class="item" label="图片2">
              <el-input v-model="item.pic2" disabled></el-input>
              <el-upload
                class="upload"
                name="pic"
                action="/cms_api/super/uploadImg"
                :show-file-list="false"
                :on-success="uploadSuccess('download','pic2', index)">
                <el-button type="primary" icon="edit"></el-button>
              </el-upload>
            </el-form-item>
            <el-form-item class="item" label="下载地址" v-if="index < 2">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm('download')">保存</el-button>
            <a target="_blank" class="pre" :href='"/cms_api/pre?version="+ $route.params.title' @click="preView">预览</a>
          </el-form-item>
        </el-form>
      </template>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import axios from "../router/axios"
export default {
  data () {
    return {
      version:'',
      banner:null,
      introduction:null,
      feature:null,
      download:null,
      bannerIsEditor:false,
      introductionIsEditor:false,
      featureIsEditor:false,
      downloadIsEditor:false
    }
  },
  created(){
    this.version = this.$route.params.title
    axios.get('/cms_api/getMainPage',{params:{title:this.version}}).then((res)=>{
      const data = res.data 
      if(data.code == 0){
        this.banner = data.data.cover
        this.introduction = data.data.introduction
        this.feature = data.data.feature
        this.download = data.data.download
      }
    }).catch((err)=>{
      console.log(err)
    })
  },
  methods:{
    preView(){
    },
    uploadSuccess(name, subName, index){
      return (res,file)=>{
        if(res.code == 10401){
          alert('登录失效，请重新登录')
          return this.$router.push({path:'/'})
        }
        if(res.code != 0){
          return alert(res.msg)
        }
        if(name == 'banner'){
          this.banner[subName] = res.src
        }else if(name == 'introduction'){
          this.introduction[index][subName] = res.src
        }else if(name == 'feature'){
          this.feature.list[index][subName] = res.src
          console.log(this.feature)
        }else if(name == 'download'){
          this.download.list[index][subName] = res.src
        }
      }
    },
    submitForm(name){
      if(name == 'banner'){
        if(!this.banner){
          return alert('banner 数据为空')
        }
        axios.post('/admin/super/setMain',{title:this.version, banner:this.banner}).then((res)=>{
          const data = res.data
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
          this.bannerIsEditor = false
        }).catch((err)=>{
          console.log(err)
        })
      }else if(name == 'introduction'){
        if(!this.introduction || this.introduction.length == 0){
          return alert('introduction 数据为空')
        }
        axios.post('/cms_api/super/setMain',{title:this.version, introduction: this.introduction}).then((res)=>{
          const data = res.data
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
          this.introductionIsEditor = false
        }).catch((err)=>{
          console.log(err)
        })
      }else if(name == 'feature'){
        if(!this.feature){
          return alert('产品特色 数据为空')
        }
        axios.post('/cms_api/super/setMain',{title:this.version, feature:this.feature}).then((res)=>{
          const data = res.data
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
          this.featureIsEditor = false
        }).catch((err)=>{
          console.log(err)
        })
      }else if(name == 'download'){
        if(!this.download){
          return alert('多平台支持 数据为空')
        }
        axios.post('/cms_api/super/setMain',{title:this.version, download:this.download}).then((res)=>{
          const data = res.data
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
          this.downloadIsEditor = false
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    toDownload(){
      let str = ''
      if(this.bannerIsEditor){
        str += 'banner,'
      }
      if(this.introductionIsEditor){
        str+= 'introduction,'
      }
      if(this.featureIsEditor){
        str+= '功能介绍,'
      }
      if(this.downloadIsEditor){
        str+= '多平台支持,'
      }
      if(str){
        this.$confirm(str + '有数据未保存, 确定直接离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: 'download', params: {
              title: this.$route.params.title
            }
          })
        }).catch(() => {})
      }else{
        this.$router.push({ name: 'download', params: {
            title: this.$route.params.title
          }
        })
      }
    }
  },
  watch:{
    banner:{
      handler(newVal,oldVal){
        if(oldVal !== null){
          this.bannerIsEditor = true
        }
      },
      deep:true
    },
    introduction:{
      handler(newVal,oldVal){
        if(oldVal !== null){
          this.introductionIsEditor = true
        }
      },
      deep:true
    },
    feature:{
      handler(newVal,oldVal){
        if(oldVal !== null){
          this.featureIsEditor = true
        }
      },
      deep:true
    },
    download:{
      handler(newVal,oldVal){
        if(oldVal !== null){
          this.downloadIsEditor = true
        }
      },
      deep:true
    }
  }
}
</script>

<style scoped>
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
.button-line{
  border-bottom:1px solid #999;
}
.pre{
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #c4c4c4;
  margin: 0 10px;
  padding: 10px 15px;
  border-radius: 4px;
  color: #fff;
  background-color: #20a0ff;
  border-color: #20a0ff;
  text-decoration: none;
}
.pre:hover{
  background: #4db3ff;
  border-color: #4db3ff;
  color: #fff;
}
</style>
