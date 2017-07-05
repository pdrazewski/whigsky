<template>
	<div>
		<div class="c-ruler"></div>
		<div class="c-editor">
			<form class="a-form" @submit.prevent="save">
				<div class="a-form_row">
					<label class="a-form_label">Name:</label>
					<input class="a-form_field" v-model="name" :placeholder="placeholder" type="text" @input="$v.name.$touch()">
					<span class="a-form_error" v-if="!$v.name.required">Field is required</span>
				</div>
				<div class="a-form_row">
					<label class="a-form_label">Background color:</label>
					<input class="a-form_field" id="bg-color" v-model="bgcolor" @input="$v.bgcolor.$touch()" type="text">
					<span class="a-form_error" v-if="!$v.bgcolor.required">Field is required</span>
					<span class="a-form_error" v-if="!$v.bgcolor.maxLength">Background color must have at most {{$v.bgcolor.$params.maxLength.max}} chars.</span>
				</div>
				<div class="a-form_row">
					<label class="a-form_label">Width (px):</label>
					<input class="a-form_field" v-model="width" @input="$v.width.$touch()" type="number">
					<span class="a-form_error" v-if="!$v.width.required">Field is required</span>
					<span class="a-form_error" v-if="!$v.width.numeric">Field is numeric only</span>
				</div>
				<div class="a-form_row">
					<label class="a-form_label">Height (px):</label>
					<input class="a-form_field" v-model="height" @input="$v.height.$touch()" type="number">
					<span class="a-form_error" v-if="!$v.height.required">Field is required</span>
					<span class="a-form_error" v-if="!$v.height.numeric">Field is numeric only</span>
				</div>
				<div class="a-form_row">
					<label class="a-form_label">Border-radius ({{radius}}px):</label>
					<range-slider
					    class="slider"
					    min="0"
					    :max="radiusRatio"
					    step="1"
					    v-model="radius">
					</range-slider>
					<span class="a-form_from">0</span>
					<span class="a-form_to">{{radiusRatio}}px </span>
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
		<div class="c-scene" id="output">
			<div class="c-scene_cell">
				<div class="c-scene_output" :style="rectStyle"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import RangeSlider from 'vue-range-slider'
	import firebaseConnect from '../firebase.js'
	import { required, numeric, maxLength } from 'vuelidate/lib/validators'
	const colorPicker = require('color-picker')	
	export default {
		name: 'component-visual-editor',
		components: {
			RangeSlider
		},
		data() {
			return {
				placeholder: "My amazing rectangle",
				name: "",
				bgcolor: '#ccc',
				width: 500,
				height: 400,
				radius: 0,
				newKey: "",
				saved: false,
				saving: false,
				picker: null
			}
		},
		validations: {
			name: {
		      	required
		    },
		    bgcolor: {
		      	required,
		      	maxLength: maxLength(7)
		    },
		    width: {
		      	required,
		      	numeric
		    },
			height: {
		      	required,
		      	numeric
		    },
		    validationGroup: ['name', 'bgcolor', 'width', 'height']
		},
		computed: {
			/**
			 * Calculate max radius value
			 */
			radiusRatio: function() {
				return Math.min(this.width, this.height)/2;
			},
			/**
			 * Compute presentation styles
			 */
			rectStyle: function () {
				return {
					width: this.width + "px",
					height: this.height + "px",
					background: this.bgcolor,
					"border-radius": this.radius + "px"
				}
			}
		},
		mounted() {
			this.colorPickerInit();
			this.newKey = firebaseConnect.helpers.generateKey()
			this.handleRangeSlider()
		},
		destroyed() {
			this.picker.destroy()
		},
		methods: {
			/**
			 * Add click handler for rangeSlider
			 */
			handleRangeSlider() {
				const rangeSlider = this.$el.querySelector('.range-slider')
				const editor = this.$el.querySelector('.c-editor')
				rangeSlider.addEventListener('click', function(e){
					let calcSpace = editor.offsetWidth*0.02
					let position = ((e.pageX - editor.offsetLeft - calcSpace)/rangeSlider.offsetWidth);
					let maxValue =  Math.min(this.width, this.height)/2;
					this.radius = Math.floor(position*maxValue,2) > maxValue ? maxValue : Math.floor(position*maxValue,2)
				}.bind(this))
			},
 			/**
			 * Initialize colorPicker plugin
			 */
			colorPickerInit() {
				this.picker = new CP(this.$el.querySelector('#bg-color'));
				this.picker.on("change", function(color) {
  					this.bgcolor = '#' + color;
				}.bind(this));	
			},
			/**
			 * Calculate relative width, height for presentation purpouse
			 */
			calculateBaseRect(obj) {
				const rectSide = Math.max(obj.width, obj.height);
				return {
					relativeWidth: obj.width/rectSide*100,
					relativeHeight: obj.height/rectSide*100
				}
			},
			/**
			 * Create object with all the data
			 * Push object to Firebase 
			 */
			save() {
				this.saving = true
				const calculated = this.calculateBaseRect({
					width: this.width,
					height: this.height
				})
				const data = {
					key: this.newKey,
					data: {
						key: this.newKey,
						name: this.name,
						style: this.rectStyle,
						computedStyle: {
							width: calculated.relativeWidth + "%",
							height:  calculated.relativeHeight + "%",
							background: this.bgcolor,
							"border-radius": this.radius/this.width*100 + "%/" + this.radius/this.height*100 + "%"
						},
						createdAt: firebaseConnect.helpers.created()
					}
				}
				firebaseConnect.helpers.push(data, "saved", this, function(){
					this.name = ""
					this.bgcolor = '#ccc'
					this.width = 500
					this.height = 400
					this.radius = 0
					this.saving = false
					this.newKey = firebaseConnect.helpers.generateKey()
					setTimeout(function(){
						this.saved = false
					}.bind(this), 2500)
				}.bind(this))
			}
		}
	}
</script>