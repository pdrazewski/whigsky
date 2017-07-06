import Vue from 'vue'
import VueRouter from 'vue-router'

// routing
import index from './views/v-index.vue'

Vue.use(VueRouter)
const router = new VueRouter({
	routes: [
		{ path: '/', component: index }
	]
}) 

//validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate) 

var vm = new Vue({router}).$mount('#app') 
