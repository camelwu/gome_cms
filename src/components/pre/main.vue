<template>
	<div>
	<pre-header></pre-header>
		
	<pre-footer></pre-footer>
	</div>
</template>
<script>
import preFooter from './footer.vue'
import preHeader from './header.vue'
export default {
	data(){
		return {}
	},
	components:{
		preFooter,
		preHeader
	}
}
</script>