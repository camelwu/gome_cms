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
      <h1>banner</h1>
      <el-form label-width="140px" class="button-line">
        <el-form-item class="item" label="白色底logo">
         <el-input v-model="banner.logo" disabled></el-input>
          <el-upload
            class="upload"
            name="pic"
            action="/admin/super/uploadImg"
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
            action="/admin/super/uploadImg"
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
            action="/admin/super/uploadImg"
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
            action="/admin/super/uploadImg"
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
            action="/admin/super/uploadImg"
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
            action="/admin/super/uploadImg"
            :show-file-list="false"
            :on-success="uploadSuccess('banner','blurSmallPic')">
            <el-button type="primary" icon="edit"></el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('banner')">保存</el-button>
          <el-button type="primary" @click="preView">预览</el-button>
        </el-form-item>
      </el-form>
      <h1>introduction</h1>
      <el-form label-width="140px" class="button-line" >
        <div v-for="(item, index) in introduction">
          <span>第{{index + 1}}组</span>
          <el-form-item class="item" label="图片">
            <el-input v-model="item.pic" disabled></el-input>
            <el-upload
            class="upload"
            name="pic"
            action="/admin/super/uploadImg"
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
          <el-button type="primary" @click="preView">预览</el-button>
        </el-form-item>
      </el-form>
      <h1>Aeromind 产品特色</h1>
      <el-form label-width="140px" class="button-line">
        <el-form-item class="item" label="大标题">
          <el-input v-model="feature.title"></el-input>
        </el-form-item>
        <el-form-item class="item" label="大简介">
          <el-input v-model="feature.subTitle"></el-input>
        </el-form-item>
        <div v-for="(item, index) in feature.list">
          <span>第{{index + 1}}组</span>
          <el-form-item class="item" label="图片">
            <el-input v-model="item.pic" disabled></el-input>
            <el-upload
            class="upload"
            name="pic"
            action="/admin/super/uploadImg"
            :show-file-list="false"
            :on-success="uploadSuccess('feature','pic', index)">
            <el-button type="primary" icon="edit"></el-button>
          </el-upload>
          </el-form-item>
          <el-form-item class="item" label="标题" >
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item class="item" label="简介">
            <el-input v-model="item.summary"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('feature')">保存</el-button>
          <el-button type="primary" @click="preView">预览</el-button>
        </el-form-item>
      </el-form>
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
            action="/admin/super/uploadImg"
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
              action="/admin/super/uploadImg"
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
          <el-button type="primary" @click="preView">预览</el-button>
        </el-form-item>
      </el-form>
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
      banner:{
        logo:"",
        opacityLogo:"",
        backgroundPic:"",
        blurBackgroundPic:"",
        smallPic:"",
        blurSmallPic:""
      },
      introduction:[
        {
          pic:'',
          title:'',
          picSrc:'',
          summary:''
        },{
          pic:'',
          title:'',
          picSrc:'',
          summary:''
        },{
          pic:'',
          picSrc:'',
          title:'',
          summary:''
        }
      ],
      feature:{
        title:'',
        subTitle:'',
        list:[
          {
            pic:'',
            title:'',
            picSrc:'',
            summary:''
          },{
            pic:'',
            title:'',
            picSrc:'',
            summary:''
          },{
            pic:'',
            picSrc:'',
            title:'',
            summary:''
          },{
            pic:'',
            title:'',
            picSrc:'',
            summary:''
          },{
            pic:'',
            picSrc:'',
            title:'',
            summary:''
          },{
            pic:'',
            title:'',
            picSrc:'',
            summary:''
          },{
            pic:'',
            picSrc:'',
            title:'',
            summary:''
          },{
            pic:'',
            title:'',
            picSrc:'',
            summary:''
          }
        ]
      },
      download:{
        title:'',
        subTitle:'',
        list:[
          {
            pic1:'',
            pic2:'',
            pic1Src:'',
            pic2Src:'',
            url:''
          },{
            pic1:'',
            pic2:'',
            pic1Src:'',
            pic2Src:'',
            url:''
          },{
            pic1:'',
            pic2:'',
            pic1Src:'',
            pic2Src:''
          },{
            pic1:'',
            pic2:'',
            pic1Src:'',
            pic2Src:''
          }
        ]
      },
      bannerChange: true,
      introductionChange: false,
      featureChange: false,
      downloadChange: false
    }
  },
  created(){
    this.version = this.$route.params.title
    axios.get('/admin/getMainPage',{params:{title:this.version}}).then((res)=>{
      const data = res.data 
      console.log(data)

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
    formatBanner(){
      if(
          this.banner.opacityLogoSrc
          && this.banner.logoSrc
          && this.banner.backgroundPicSrc
          && this.banner.blurBackgroundPicSrc
          && this.banner.smallPicSrc
          && this.banner.blurSmallPicSrc
        ){
        return {
          opacityLogo:this.banner.opacityLogoSrc,
          logo:this.banner.logoSrc,
          backgroundPic:this.banner.backgroundPicSrc,
          blurBackgroundPic:this.banner.blurBackgroundPicSrc,
          smallPic:this.banner.smallPicSrc,
          blurSmallPic:this.banner.blurSmallPicSrc
        }
      }else{
       return false 
      }
    },
    formatIntroduction(){
      return this.introduction.map((item)=>{
        return {
          pic:item.picSrc,
          title:item.title,
          summary:item.summary
        }
      })
    },
    formatFeature(){
      const list = this.feature.list.map((item)=>{
        return{
          pic: item.picSrc,
          title: item.title,
          summary: item.summary
        }
      })
      return {
        title: this.feature.title,
        subTitle: this.feature.subTitle,
        list: list
      }
    },
    formatDownload(){
      const list = this.feature.list.map((item)=>{
        return{
          pic: item.picSrc,
          title: item.title,
          summary: item.summary
        }
      }) 
      return {
        title: this.download.title,
        subTitle: this.download.subTitle,
        list: list
      }
    },
    uploadSuccess(name, subName, index){
      const _this = this
      return (res,file)=>{
        if(res.code == 10401){
          alert('登录失效，请重新登录')
          return this.$router.push({path:'/'})
        }
        if(res.code != 0){
          return alert(res.msg)
        }
        if(name == 'banner'){
          this.banner[subName] = res.name
          this.banner[subName+'Src'] =  res.src
        }else if(name == 'introduction'){
          this.introduction[index][subName] = res.name
          this.introduction[index][subName+'Src'] =  res.src
        }else if(name == 'feature' || name == 'download'){
          this.feature.list[index][subName] = res.name
          this.feature.list[index][subName+'Src'] =  res.src
        }
      }
    },
    submitForm(name){
      if(name == 'banner'){
        const banner = this.formatBanner()
        if(!banner){
          return alert('banner 有数据为空')
        }
        axios.post('/admin/super/setMain',{title:this.version, banner:banner}).then((res)=>{
          const data = res.data
          console.log(data)
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }else if(name == 'introduction'){
        const introduction = this.formatIntroduction()
        if(!introduction){
          return alert('introduction 有数据为空')
        }
        axios.post('/admin/super/setMain',{title:this.version, introduction:introduction}).then((res)=>{
          const data = res.data
          console.log(data)
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }else if(name == 'feature'){
        const feature = this.formatFeature()
        console.log(feature)
        if(!feature){
          return alert('产品特色 有数据为空')
        }
        axios.post('/admin/super/setMain',{title:this.version, feature:feature}).then((res)=>{
          const data = res.data
          console.log(data)
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }else if(name == 'download'){
        const download = this.formatDownload()
        if(!download){
          return alert('多平台支持 有数据为空')
        }
        axios.post('/admin/super/setMain',{title:this.version, download:download}).then((res)=>{
          const data = res.data
          console.log(data)
          if(data.code == 0){
            alert('保存成功')
          }else{
            alert(data.msg)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    toDownload(){
      let str = ''
      if(this.bannerChange ){
        str += 'banner,'
      }
      if(this.introductionChange){
        str+= 'introduction,'
      }
      if(this.featureChange){
        str+= '功能介绍,'
      }
      if(this.downloadChange){
        str+= '多平台支持,'
      }

      if(str){
        this.$confirm(str + '有数据未保存, 确定直接离开?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({path:'/download/'+this.version})
        }).catch(() => {})
      }else{
        this.$router.push({path:'/download/'+this.version})
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
</style>
