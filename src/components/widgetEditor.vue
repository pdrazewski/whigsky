<template>
	<div >
		<div>
			<form class="a-form"@submit.prevent="save">
				<div class="c-accordion clearfix">
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-1" name="static-items" checked="checked">
						<label class="c-accordion_label" for="static-tab-1">Dane podstawowe</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Nazwa</label>
										</label>
									</div>
									<div class="a-form_field">
										 <input type="text" class="a-form_text" v-model="basic.name" />
									</div>
								</div>
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Autor</label>
										</label>
									</div>
									<div class="a-form_field">
										 <input type="text" class="a-form_text" v-model="basic.author" />
									</div>
								</div>
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Typ</label>
										</label>
									</div>
									<div class="a-form_field">
										 <input type="text" class="a-form_text" v-model="basic.type" />
									</div>
								</div>
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Kategoria</label>
										</label>
									</div>
									<div class="a-form_field">
										 <input type="text" class="a-form_text" v-model="basic.category" />
									</div>
								</div>
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Publiczny/prywatny:</label>
										</label>
									</div>
									<div class="a-form_field">
										 <input type="text" class="a-form_text" v-model="basic.access" />
									</div>
								</div>
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Opis:</label>
										</label>
									</div>
									<div class="a-form_field">
										 <textarea rows="12" type="text" class="a-form_text" v-model="basic.description"></textarea>
									</div>
								</div>
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Miniaturka:</label>
										</label>
									</div>
									<div class="a-form_field">
										 <input type="text" class="a-form_text" v-model="basic.thumbnail" />
									</div>
								</div>
								<div class="a-form_row">
									<div class="a-form_label">
										<label class="a-form_label" for="name">
											<label>Srodowisko:</label>
										</label>
									</div>
									<div class="a-form_field">
										 <input type="text" class="a-form_text" v-model="basic.environment" />
									</div>
								</div>
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-2" name="static-items">
						<label class="c-accordion_label" for="static-tab-2">Szablon (template)</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">	
								<div class="a-form_field">					   	
								<textarea v-model="template" class="a-form_text" rows="20" type="text" @input="validateTemplate();"></textarea>
								</div>
								<div class="a-form_legend">
									<div v-for="(varName, index) in vars">
										<p>Ustawienia pola: {{varName.data}} ({{varName.items}} )</p>
										<label>Nazwa wyświetlana: <input type="text"></label>
										<p style="margin-top:10px">
											Typ pola 
											<select>
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
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-3" name="static-items" >
						<label class="c-accordion_label" for="static-tab-3">Style (scss)</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
								<textarea v-model="styles" class="a-form_field" type="text" >
								test
								</textarea>
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-4" name="static-items">
						<label class="c-accordion_label" for="static-tab-4">Javascript</label>
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
						<label class="c-accordion_label" for="static-tab-5">Podgląd konfiguracji (testowe dane)</label>
						<div class="c-accordion_content">
							<div class="c-accordion_contentRaw">
								<div v-html="rawHtml"></div>
							</div> 	
						</div>
					</div>
					<div class="c-accordion_item">
						<input type="radio" id="static-tab-6" name="static-items">
						<label class="c-accordion_label" for="static-tab-6">Podgląd</label>
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
				key: "",
				basic: {
					name: "",
					author: "",
					type: "",
					category: "",
					access: "",
					description: "",
					thumbnail: "",
					environment: ""
				},
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
			save() {
				this.rawHtml = nunjucks.renderString(this.template, this.data);
				let data = {
					db: 'widgets',
					key: this.key,
					data: {
						basic: this.basic,
						template: this.template,
						style: this.styles,
						key: this.key,
						vars: this.vars
					}
				}
				firebase.helpers.push(data, "saved", this)
			}
		}
	}
</script>