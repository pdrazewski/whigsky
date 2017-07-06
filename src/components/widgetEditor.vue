<template>
	<div>
		<div class="c-editor">
			<form class="a-form" @submit.prevent="compile">
				<div class="a-form_row">
					<label class="a-form_label">Template:</label>
					<textarea v-model="template" class="a-form_field" type="text" @input="validateTemplate();" style="height: 500px; line-height: 20px;">
					test
					</textarea>
					<textarea v-model="styles" class="a-form_field" type="text" @input="compileSCSS();" style="height: 500px; line-height: 20px;">
					test
					</textarea>
				</div>
				<div>
					<div v-for="(varName, index) in vars">
						<p>{{varName.data}} {{varName.items}} 
						Ustawienia pola <br>
						Typ pola <select>
						<option>String</option>
						<option>Number</option>
						<option>String + filemanager (src)</option>
						<option>Tablica elementów</option>
						</select>
						Walidacja? <input type="text" />
						</p>
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
	export default {
		name: 'widget-editor',
		data() {
			return {
				placeholder: "My amazing widget",
				name: "",
				template: "",
				styles: "",
				vars: [],
				data: {},
				loops: [],
				rawHtml: ''
			}
		},
		computed: {
			
		},
		mounted() {

		},
		destroyed() {
			
		},
		methods: {
			validateTemplate() {
				let variables = this.template.match(/{{\s*[\w\.]+\s*}}/g)
				let loops = this.template.match(/{% for [^{}]*%}/g)
				if (variables != null) {
					_.uniq(variables).forEach((item) => {
						this.vars.push({
							items: null,
							data: item.replace('{{','').replace('}}','').replace(/ /g,'')
						})
					})
				}
				
				if (loops != null) {
					loops.forEach((item) => {
						this.vars.push({
							items: item.split("in")[0].replace("{% for ", ""),
							data: item.split("in")[1].replace("%}", "")
						})
					})
				}
			},
			compile() {
				this.rawHtml = nunjucks.renderString(this.template, this.data);
			}
		}
	}
</script>