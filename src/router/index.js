import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import VHome from '@/components/v-home'
import Main from '@/components/main'
import Download from '@/components/download'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
	routes: [
		{
		  path: '/',
		  name: 'Hello',
		  component: HelloWorld
		},
		{
			path:"/home",
			component: Home
		},{
			path: "/v-home",
			component: VHome
		},{
			path: "/editor/main/:title",
			component: Main
		},{
			path: "/download/:title",
			name: 'download',
			component: Download
		},{
			path: "/editor/detail/:title/:platform/:version",
			component: Detail
		}
	]
})
