import test from 'ava';
import _ from 'underscore';
import Vue from 'vue'
import visualEditor from '../../../src/components/visualEditor.vue'

test('visualEditor should have default data defined', t => {
	const partString = 'property should be defined';
  	t.not(visualEditor.data().name, undefined, `name ${partString}`)
  	t.not(visualEditor.data().bgcolor, undefined, `background color ${partString}`)
  	t.not(visualEditor.data().width, undefined, `width ${partString}`)
  	t.not(visualEditor.data().height, undefined, `height ${partString}`)
  	t.not(visualEditor.data().radius, undefined, `border-radius ${partString}`)
  	t.not(visualEditor.data().newKey, undefined, `newKey ${partString}`)
  	t.not(visualEditor.data().saved, undefined, `saved ${partString}`)
})

test('calculateBaseRect method work correctly', t => {
	let data = {
		case1: {
			width: 24, 
			height: 30
		},
		case2: {
			width: 120,
			height: 500
		},
		case3: {
			width: 1500,
			height: 20
		}
	}
	const case1 = visualEditor.methods.calculateBaseRect(data.case1)
	const case2 = visualEditor.methods.calculateBaseRect(data.case2)
	const case3 = visualEditor.methods.calculateBaseRect(data.case3)
	t.is(case1.relativeWidth, 80)
	t.is(case1.relativeHeight, 100)
	t.not(case2.relativeWidth, 180)
	t.is(case2.relativeWidth, 24)
	t.is(case2.relativeHeight, 100)
	t.is(case3.relativeWidth, 100)
	t.is(case3.relativeHeight, 1.3333333333333335)
})
