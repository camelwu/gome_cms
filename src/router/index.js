import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import VHome from '@/components/v-home'
import Main from '@/components/main'

Vue.use(Router)

export default new Router({
	mode:'history',
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
		}
	]
})
