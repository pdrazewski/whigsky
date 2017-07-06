<template>
	<div>
		<div class="c-editor">
			<form class="a-form" @submit.prevent="compile">
				<div class="a-form_row">
					<label class="a-form_label">Template:</label>
					<textarea v-model="template" class="a-form_field" type="text" @input="validateTemplate();$v.template.$touch()" style="height: 500px; line-height: 20px;">
					test
					</textarea>
					<span class="a-form_error" v-if="!$v.template.required">Field is required</span>
				</div>
				<div>
					<div v-for="(varName, index) in vars">
						<p>{{compileName(varName)}} <input type="text" v-model="data[compileName(varName)]" /></p>
					</div>
				</div>
				<div v-html="rawHtml">
					
				</div>
				<div class="a-form_row a-form_btn">
					<button type="submit" class="a-btn is-primary"
					>Save <span v-if="saving">...</span></button>	
				</div>
				<div class="a-alert" v-if="saved">
					{{saved}}. <br>
					<router-link to="/gallery">
					 	<span>See all</span>
					</router-link>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import firebaseConnect from '../firebase.js'
	import _ from 'lodash'
	import nunjucks from 'nunjucks'
	import { required, numeric, maxLength } from 'vuelidate/lib/validators'
	export default {
		name: 'widget-editor',
		data() {
			return {
				placeholder: "My amazing widget",
				name: "",
				template: "",
				vars: [],
				data: {},
				loops: [],
				rawHtml: ''
			}
		},
		validations: {
			name: {
		      	required
		    },
		    template: {
		      	required
		    },
		    validationGroup: ['name','template']
		},
		computed: {
			
		},
		mounted() {

		},
		destroyed() {
			
		},
		methods: {
			validateTemplate() {
				this.loops = this.template.match(/{%[^{}]*%}/g)
				let find = this.template.match(/{{\s*[\w\.]+\s*}}/g)
				this.vars =  _.uniq(find);
			},
			compileName(name) {
				return name.replace('{{','').replace('}}','')
			},
			compile() {
				this.rawHtml = nunjucks.renderString(this.template, this.data);
			}
		}
	}
</script>