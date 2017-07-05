<template>
	<viewBase class="v-gallery">
		<template slot>
			<loader v-if="!ready"></loader>
			<template v-if="ready">
				<p class="a-typo is-primary">Gallery ({{itemsQt}})</p>
				<div class="c-sort">
					<p class="a-typo a-secondary">Sort by</p>
					<button class="a-btn is-primary" :class="{'is-active': isActive_createdAt}" @click="sortBy('createdAt')">
						Creation date
						<span :class="{'is-asc': sort.createdAt.asc}"></span>
					</button>
					<button class="a-btn is-primary" :class="{'is-active': isActive_name}" @click="sortBy('name', null, 'string')">
						Name
						<span :class="{'is-asc': sort.name.asc}"></span>
					</button>
					<button class="a-btn is-primary" :class="{'is-active': isActive_width}" @click="sortBy('width','style','number')">		Width
						<span :class="{'is-asc': sort.width.asc}"></span>
					</button>
					<button class="a-btn is-primary" :class="{'is-active': isActive_height}" @click="sortBy('height', 'style', 'number')">
						Height
						<span :class="{'is-asc': sort.height.asc}"></span>
					</button>
					<button class="a-btn is-primary" :class="{'is-active': isActive_radius}" @click="sortBy('border-radius','style','number')">
						Border radius
						<span :class="{'is-asc': sort['border-radius'].asc}"></span>
					</button>
				</div>
				<transition-group name="flip-list" tag="div" class="c-gallery">
				<div v-bind:key="item" v-for="(item, index) in items" class="c-gallery_item">
					<div class="c-gallery_itemWrapper">
						<div class="c-gallery_itemRaw" :style="item.computedStyle"></div>
					</div>
					<div class="c-gallery_itemMeta">
						<p class="c-gallery_itemName">
							{{item.name}} 
							<span>({{item.style.width}} / {{item.style.height}} / {{item.style["border-radius"]}})</span>
						</p>
						<a href="#" title="Move to trash..." class="c-gallery_itemRemove" @click.prevent="removeTeam(item.key)"></a>
					</div>
				</div>
				</transition-group>
			</template>
		</template>
	</viewBase>
</template>

<script>
	import viewBase from './v-base.vue'
	import loader from '../atoms/a-loader.vue'
	import firebaseConnect from '../firebase.js'
	const debounce = require('lodash.debounce')
	const sortBy = require('lodash.sortby')
	const size = require('lodash.size')
	export default {
		name: 'view-rects-gallery',
		components: {
			viewBase,
			loader
		},
		data() {
			return {
				items: [],
				ready: false,
				sort: {
					name: {
						asc: true
					},
					width: {
						asc: true
					},
					height: {
						asc: true
					},
					"border-radius": {
						asc: true
					},
					createdAt: {
						asc: true
					}
				},
				isActive_createdAt: true,
				isActive_name: false,
				isActive_width: false,
				isActive_height: false,
				isActive_radius: false
			}
		},
		computed: {
			/**
			 * Return size of items object
			 */
			itemsQt: function() {
				return size(this.items)
			}
		},
		mounted(){
			firebaseConnect.helpers.fetchDB('items', this, function() {
				setTimeout(this.drawGallery, 0)
				this.ready = true;
			}.bind(this));
			window.addEventListener("resize", debounce(this.drawGallery, 150))
		},
		methods: {
			/**
			 * Helper function for drawind square boxes
			 */
			drawGallery() {
				let items = this.$el.querySelectorAll('.c-gallery_item')
				if (items.length) {
					let initial = items[0].clientWidth
					items.forEach(function(item){
						item.style.height = initial + "px"
					})
				}
			},
			/**
			 * Remove item from Firebase db
			 */
			removeTeam(key) {
				this.ready = false;
				firebaseConnect.helpers.removeKey('items', key)
				firebaseConnect.helpers.fetchDB('items', this, function() {
					setTimeout(this.drawGallery, 0)
					this.ready = true;
				}.bind(this))
			},
			/**
			 * Toggle button class for current sort type
			 */
			toggleCurrentSortType(data, key) {
				data.isActive_createdAt = false
				data.isActive_name = false
				data.isActive_width = false
				data.isActive_height = false
				data.isActive_radius = false
				if (key == "border-radius") {
					data['isActive_radius'] = true
				} else {
					data['isActive_'+key] = true
				}
			},
			/**
			 * Sort items based on arguments
			 */
			sortBy(key, property, type) {
				let sortedItems = sortBy(this.items, [function(o) { 
					if (type == 'number') {
						return parseInt(o[property][key])
					} else {
						if (type == 'string') {
							return o[key].toLowerCase();
						} else {
							return o[key]
						}
					}
				}])
				this.items = this.sort[key].asc ? sortedItems.reverse() : sortedItems
				this.sort[key].asc = !this.sort[key].asc
				this.toggleCurrentSortType(this, key)
				setTimeout(this.drawGallery, 0)
			}
		}
	}
</script>
