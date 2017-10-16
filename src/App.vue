<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="components-container">
      <Tinymce :height=600 ref="editor" v-model="content"></Tinymce>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'app',
  components: { Tinymce },
    data () {
      return {
        content: 'test'
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>