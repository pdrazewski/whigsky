<template>
	<div>
		<div class="c-editor">
			<form class="a-form" @submit.prevent="save">
				<div class="a-form_row">
					<label class="a-form_label">Name:</label>
					<input class="a-form_field" v-model="name" :placeholder="placeholder" type="text" @input="$v.name.$touch()">
					<span class="a-form_error" v-if="!$v.name.required">Field is required</span>
				</div>
				<div class="a-form_row">
					<label class="a-form_label">Template:</label>
					<input class="a-form_field" v-model="template" :placeholder="placeholder" type="text" @input="validateTemplate()">
					<span class="a-form_error" v-if="!$v.template.required">Field is required</span>
				</div>
				<div class="a-form_row a-form_btn">
					<button type="submit" class="a-btn is-primary" 
					:class="{'is-disabled': $v.validationGroup.$invalid}"
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
	import { required, numeric, maxLength } from 'vuelidate/lib/validators'
	export default {
		name: 'widget-editor',
		data() {
			return {
				placeholder: "My amazing widget",
				name: "",
				template: ""
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
				$v.template.$touch()
			}
		}
	}
</script>