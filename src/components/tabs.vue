<template>
	<div class="c-accordion clearfix">
		<template v-for="(item, index) in items">	
				<div class="c-accordion_item">
					<input class="js-accordion_item" type="radio" :id="'static-tab-'+index" name="static-items" checked="">
					<label :for="'static-tab-'+index">{{item.name}}</label>
					<div class="c-accordion_content">
						<div class="c-accordion_contentRaw">
						   	{{item.content}}
						</div> 	
					</div>
				</div>
		</template>
	</div>
</template>
<script>
export default {
	name: 'component-tabs',
	props: {
		items: {
			type: Array,
			required: true,
			default: []
		}
	}
}
</script>
