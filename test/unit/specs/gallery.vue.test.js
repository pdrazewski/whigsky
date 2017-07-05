import test from 'ava';
import _ from 'underscore';
import Vue from 'vue'
import gallery from '../../../src/views/v-gallery.vue'

test('toggleCurrentSortType method should work correclty', t => {
	const data = {
		isActive_createdAt: true,
		isActive_name: false,
		isActive_width: false,
		isActive_height: false,
		isActive_radius: false
	}
	let case1 = gallery.methods.toggleCurrentSortType(data, "border-radius");
	t.truthy(data.isActive_radius)
	t.falsy(data.isActive_createdAt)
})

test('Object size method should work correclty', t => {
	const data = {
		items: {
			a: {}, 
			b: {},
			c: {}
		}
	}
	t.is(gallery.computed.itemsQt.call(data), 3)
	t.not(gallery.computed.itemsQt.call(data), 13)
})