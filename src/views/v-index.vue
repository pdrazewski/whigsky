<template>
	<viewBase class="v-index">
		<template slot>
			
			Ostatnio dodane widgety <br>
			<div v-for="(widget, index) in widgets">
				<span>{{widget.name}}</span>
				<router-link v-if="logged" :to="'/widget-edit/' + widget.key">
					Edit
				</router-link>
			</div>
			Ostatnio dodane strony <br>
			<div v-for="(page, index) in pages">
				<span>{{page.name}}</span>
				<router-link v-if="logged" :to="'/page-edit/' + page.key">
					Edit
				</router-link>
			</div>
		</template>
	</viewBase>
</template>

<script>
	import viewBase from './v-base.vue'
	import firebase from '../firebase.js'
	export default {
		name: 'view-index',
		components: {
			viewBase
		},
		data() {
			return {
				widgets: {},
				pages: {},
				tabs: [{
					name: "Dane podstawowe",
					content: "AAAAA"
				},{
					name: "Szablon (template)",
					content: "AAAAA BBB CCC"
				},{
					name: "Style (css)",
					content: "AAAAA BBB CCC"
				},{
					name: "Javascript",
					content: "AAAAA BBB CCC"
				}]
			}
		},
		computed: {
			logged() {
				return this.$store.state.user.id
			}
		},
		created() {
			firebase.helpers.fetchDB('widgets', this)
			firebase.helpers.fetchDB('pages', this)
		}
	}
</script>
