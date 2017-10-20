<template>
  <div class="box">
    <div class="nav">
      <div>
        <el-button type="primary">
          首页
        </el-button>
        <el-button type="primary">
          下载页
        </el-button>
      </div>
    </div>
    <div class="form-box">
      <h1>banner</h1>
      <el-form label-width="140px">
        <el-form-item class="item" label="白色底logo" prop="checkPass">
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
        <el-form-item class="item" label="透明底logo" prop="pass">
          <el-input v-model="banner.opacityLogo" disabled></el-input>
          <el-button type="primary" icon="edit"></el-button>
        </el-form-item>
        <el-form-item class="item" label="大背景图片" prop="pass">
          <el-input v-model="banner.backgroundPic" disabled></el-input>
          <el-button type="primary" icon="edit"></el-button>
        </el-form-item>
        <el-form-item class="item" label="模糊大背景图片" prop="pass">
          <el-input v-model="banner.blurBackgroundPic" disabled></el-input>
          <el-button type="primary" icon="edit"></el-button>
        </el-form-item>
        <el-form-item class="item" label="banner内图片" prop="pass">
          <el-input v-model="banner.smallPic" disabled></el-input>
          <el-button type="primary" icon="edit"></el-button>
        </el-form-item>
        <el-form-item class="item" label="模糊banner内图片" prop="pass">
          <el-input v-model="banner.blurSmallPic" disabled></el-input>
          <el-button type="primary" icon="edit"></el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('banner')">保存</el-button>
          <el-button type="primary" @click="preView">预览</el-button>
        </el-form-item>
      </el-form>
      <h1>introduction</h1>
      <el-form label-width="140px">
        <div v-for="(item, index) in introduction">
          <span>第{{index}}组</span>
          <el-form-item class="item" label="图片" prop="checkPass">
            <el-input v-model="item.pic" disabled></el-input>
            <el-button type="primary" icon="edit"></el-button>
          </el-form-item>
          <el-form-item class="item" label="标题" prop="pass">
            <el-input v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item class="item" label="简介" prop="pass">
            <el-input v-model="item.summary"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('introduction')">保存</el-button>
          <el-button type="primary" @click="preView">预览</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "../router/axios"
export default {
  name: 'HelloWorld',
  data () {
    return {
      banner:{
        logo:"",
        logoSrc: "",
        opacityLogo:"",
        opacityLogoSrc:"",
        backgroundPic:"",
        backgroundPicSrc:"",
        blurBackgroundPic:"",
        blurBackgroundPicSrc:"",
        smallPic:"",
        smallPicSrc:"",
        blurSmallPic:"",
        blurSmallPicSrc:""
      },
      introduction:[
        {
          pic:'',
          title:'',
          pics:[],
          summary:''
        },{
          pic:'',
          title:'',
          summary:''
        }

      ]
    }
  },
  created(){
    console.log(this.$route.params.title)
  },
  methods:{
    submitForm(name){

    },
    preView(){
      
    },
    formatBanner(){
      return {
        opacityLogo:this.banner.opacityLogoSrc,
        logo:this.banner.logoSrc,
        backgroundPic:this.banner.backgroundPicSrc,
        blurBackgroundPic:this.banner.blurBackgroundPicSrc,
        smallPic:this.banner.smallPicSrc,
        blurSmallPic:this.banner.blurSmallPicSrc
      }
    },
    formatIntroduction(){
      return {
        opacityLogo:this.banner.opacityLogoSrc,
        logo:this.banner.logoSrc,
        backgroundPic:this.banner.backgroundPicSrc,
        blurBackgroundPic:this.banner.blurBackgroundPicSrc,
        smallPic:this.banner.smallPicSrc,
        blurSmallPic:this.banner.blurSmallPicSrc
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
          if(typeof index){
            this[name][subName] = res.name
            this[name][subName+'Src'] =  res.src
          }else{
            this[name][index][subName] = res.name
            this[name][index][subName+'Src'] =  res.src
          }
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
</style>
