<template>
	<footer class="b-footer">
		<div class="b-footer_primary is-content">
			<ul class="c-menu">
				<li class="c-menu_item" v-for="(item, index) in menu">
					 <router-link  :to="'/' + item.path">
					 	<span>{{item.name}}</span>
					 	<img :src="'static/'+item.img+'.png'" />
					 </router-link>
				</li>
			</ul>
		</div>
	</footer>
</template>

<script>
	export default {
		name: 'footer',
		data() {
			return {
				menu: [{
					path: '',
					name: 'Editor',
					img: 'resize'
				}, {
					path: 'gallery',
					name: 'Gallery',
					img: 'grid'
				}]
			}
		}
	}
</script>

