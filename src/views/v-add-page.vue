<template>
	<viewBase class="v-index">
		<template slot>
			add page
		</template>
	</viewBase>
</template>

<script>
	import viewBase from './v-base.vue'
	import widgetEditor from '../components/widgetEditor.vue'
	export default {
		name: 'view-index',
		components: {
			viewBase,
			widgetEditor
		}
	}
</script>
