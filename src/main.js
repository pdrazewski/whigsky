import Vue from 'vue'
import VueRouter from 'vue-router'

// routing
import index from './views/v-index.vue'
import addWidget from './views/v-add-widget.vue'
import addPage from './views/v-add-page.vue'

// store
import store from './store/store.js'

Vue.use(VueRouter)
const router = new VueRouter({
	routes: [
		{ path: '/', component: index },
		{ path: '/widget-add/:id', component: addWidget },
		{ path: '/page-add/:id', component: addPage }
	]
}) 

//validation
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate) 

var vm = new Vue({store,router}).$mount('#app') 
