import test from 'ava';
import _ from 'underscore';
import Vue from 'vue'
import baseComponent from '../../../src/views/v-base.vue'

test('Base component has no data defined', t => {
  	t.is(typeof baseComponent.data, 'undefined')
})
