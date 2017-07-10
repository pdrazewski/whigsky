<template>
	<header class="b-header">
		<div class="b-header_primary is-content">
			<div class="m-logo">
				<h1><router-link to="/">Instant widget</router-link></h1>
			</div>
			<ul class="m-menu m-menu_user">
					<template v-if="!logged">
						<li class="m-menu_item"><a href="#" v-on:click.prevent="signIn">Login</a></li>
					</template>
					<template v-else>
						<li class="m-menu_item"><p>Welcome {{logged}}</p></li>
						<li class="m-menu_item">
							<router-link  :to="/widget-add/ + newKey">
						 		Add widget +
						 	</router-link>

					 	</li>
					 	<li class="m-menu_item">
					 		<router-link  :to="/page-add/ + newKeyPage">
						 		Add page +
						 	</router-link>
						 </li>
						<li class="m-menu_item"><a href="#" class="is-secondary" v-on:click.prevent="signOut">Logout</a></li>
					</template>
				</li>
			</ul>
			<div class="m-hmbg" @click="toggleMenu()">
		        <div class="m-hmbg_item"></div>
		        <div class="m-hmbg_item"></div>
		        <div class="m-hmbg_item"></div>
		    </div>
		</div>
		<div class="m-menu_mobile">
            <ul>                             
	            <li><a href="#">Sign in</a></li>
	            <li><a href="#">Sign up</a></li>
	            <li><a href="#">Most popular</a></li>
	            <li><a href="#">Newest</a></li>
	            <li><a href="#">Categories</a></li>
	            <li><a href="#">Tags</a></li>
            </ul>
        </div>
	</header>
</template>

<script>
	/* eslint-disable no-unused-vars, camelcase, func-call-spacing, no-unexpected-multiline */
	/* eslint quotes: [0, { "avoidEscape": true }] */
	import {Firebase} from '../firebase'
	import firebase from '../firebase.js'
	export default {
		name: 'header',
		data() {
			return {
				token: '',
				newKey: '',
				newKeyPage: '',
				user: false,
				mobileMenu: false,
				menu: [{
					path: 'code-list',
					name: 'Most popular'
				}, {
					path: 'code-list',
					name: 'Newest'
				}, {
					path: 'code-add',
					name: 'Categories'
				}, {
					path: 'code-add',
					name: 'Tags'
				}]
			}
		},
		created() {
			this.newKey = firebase.helpers.generateKey({
				db: 'widgets'
			})
			this.newKeyPage = firebase.helpers.generateKey({
				db: 'pages'
			})
		},
		computed: {
			logged() {
				return this.$store.state.user.id
			}
		},
		methods: {
			signIn() {
				var provider = new Firebase.auth.GoogleAuthProvider()
				Firebase.auth().signInWithPopup(provider).then(function(result) {
					var token = result.credential.accessToken
					var user = result.user
					this.token = token
					this.user = user.displayName
					let userData = {
						provider: provider.providerId,
						name: user.displayName,
						email: user.email,
						token: token
					}
					this.$store.dispatch('userSetId', user.displayName)
					firebase.app.database().ref('users/' + user.uid).set(userData)
					console.log(result)
				}.bind(this)).catch(function(error) {
					var errorCode = error.code
					var errorMessage = error.message
					var email = error.email
					var credential = error.credential
					console.log(error)
				})
			},
			signOut() {
				Firebase.auth().signOut().then(function() {
					this.$store.dispatch('userSetId', false)
				}.bind(this))
			},
			toggleMenu() {
				let body = document.getElementsByTagName('body')[0]
				if (!this.mobileMenu) {
					body.classList.add('is-mobile-open')
					this.mobileMenu = true
				} else {
					body.classList.remove('is-mobile-open')
					this.mobileMenu = false
				}
			}
		}
	}
</script>

