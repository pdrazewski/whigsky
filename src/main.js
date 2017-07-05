import Vue from 'vue'
import VueRouter from 'vue-router'

// routing
import index from './views/v-index.vue'
import gallery from './views/v-gallery.vue'
Vue.use(VueRouter)
const router = new VueRouter({
	routes: [
		{ path: '/', component: index },
		{ path: '/gallery', component: gallery }
	]
})

//validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

new Vue({router}).$mount('#app') 
