<template>
	<viewBase class="v-index">
		<template slot>
			<visualEditor></visualEditor>
		</template>
	</viewBase>
</template>

<script>
	import viewBase from './v-base.vue'
	import visualEditor from '../components/visualEditor.vue'
	export default {
		name: 'view-index',
		components: {
			viewBase,
			visualEditor
		}
	}
</script>
