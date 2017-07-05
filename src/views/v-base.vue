<template>
	<div class="b-mainWrapper">
		<div class="b-mainWrapper_content is-content">
			<slot></slot>
		</div>
		<block-footer></block-footer>
	</div>
</template>

<script>
	import blockFooter from '../blocks/b-footer.vue'
	export default {
		name: 'view-base',
		components: {
			blockFooter
		}
	}
</script>
