<template>
	<div v-if="logged">
		<div class="c-editor">
			<form class="a-form" @submit.prevent="compile">
				<div class="a-form_row">
					<label class="a-form_label">Template:</label>
					<textarea v-model="template" class="a-form_field" type="text" @input="validateTemplate();" style="height: 500px; line-height: 20px;">
					test
					</textarea>
					<textarea v-model="styles" class="a-form_field" type="text" style="height: 500px; line-height: 20px;">
					test
					</textarea>
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
		<div class="c-editor_fields">
			Nazwa widgetu
			<input type="text" v-model="name" /> <br><br>
			<div v-for="(varName, index) in vars">
				<p>Ustawienia pola: {{varName.data}} ({{varName.items}} )</p>
				<label>Nazwa wyświetlana: <input type="text"></label>
				Typ pola <select>
				<option>String</option>
				<option>Number</option>
				<option>Filemanager (img)</option>
				<option>Tablica elementów</option>
				</select>
				</p>
			</div>
			<div v-html="rawHtml">
					
			</div>
		</div>
	</div>
</template>

<script>
	import firebase from '../firebase.js'
	import _ from 'lodash'
	import nunjucks from 'nunjucks'
	export default {
		name: 'widget-editor',
		data() {
			return {
				placeholder: "My amazing widget",
				name: "",
				key: "",
				template: "",
				styles: "",
				vars: [],
				data: {},
				saved: '',
				loops: [],
				rawHtml: ''
			}
		},
		computed: {
			logged() {
				return this.$store.state.user.id
			}
		},
		mounted() {
			this.key = this.$route.params.id
		},
		destroyed() {
			
		},
		methods: {
			validateTemplate() {
				this.vars = [];
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
				let data = {
					db: 'widgets',
					key: this.key,
					data: {
						author: this.$store.state.user.id,
						template: this.template,
						style: this.styles,
						name: this.name,
						key: this.key,
						vars: this.vars
					}
				}
				firebase.helpers.push(data, "saved", this)
			}
		}
	}
</script>