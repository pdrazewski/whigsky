<template>
	<div >
		<div>
			<form class="a-form" @submit.prevent="compile">
				<div class="c-accordion clearfix">
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-1" name="static-items" checked="checked">
						<label for="static-tab-1">Dane podstawowe</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
							   	Nazwa: Accordion <br>
								Autor: pd<br>
								Typ: default|mail|allegro|lp<br>
								Kategoria: default|oferta|<br>
								Publiczny/prywatny: ok<br>
								Opis: this is sparta<br>
								Miniaturka: this is mini turkey<br>
								Srodowisko: Samsung|Core <br>
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-2" name="static-items">
						<label for="static-tab-2">Szablon (template)</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
							   	
								<textarea v-model="template" class="a-form_field" type="text" @input="validateTemplate();" style="height: 500px; line-height: 20px;">
								test
								</textarea>
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
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-3" name="static-items" >
						<label for="static-tab-3">Style (scss)</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
								<textarea v-model="styles" class="a-form_field" type="text" style="height: 500px; line-height: 20px;">
								test
								</textarea>
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-4" name="static-items">
						<label for="static-tab-4">Javascript</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
								Dodaj bibiloteki (head, stopka)
								<textarea v-model="styles" class="a-form_field" type="text" style="height: 500px; line-height: 20px;">
								test
								</textarea>
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-5" name="static-items">
						<label for="static-tab-5">Podgląd konfiguracji (testowe dane)</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
								<div v-html="rawHtml"></div>
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-6" name="static-items">
						<label for="static-tab-6">Podgląd</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
								<div v-html="rawHtml"></div>
							</div> 	
						</div>
					</div>
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
				rawHtml: '',
				tabs: [{
					name: "Dane podstawowe",
					content: this.placeholder
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