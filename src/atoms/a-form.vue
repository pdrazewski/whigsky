<template>
	<div class="a-form">
		<form :name="form.name" :method="form.method" :action="form.action">
			<div v-for="(row, index) in rows" class="a-form_row">
				<div class="a-form_label">
					<label class="a-form_label" for="name">
						<label>{{row.label}}</label>
						<span v-if="row.required" class="a-form_sup">*</span>
					</label>
				</div>
				<div class="a-form_field">
					<template v-if="row.type === 'textarea'">
						<textarea></textarea>
					</template>
					<template v-else>
						<input :type="row.type" class="a-form_text" :class="row.customClass" v-model="row.model"/>
						<template v-if="row.data">
							{{row.data}}
						</template>
					</template>
				</div>
			</div>
			<template v-if="submit.type === 'button'">
				<button type="submit">{{submit.text}}</button>
			</template>
		</form>
	</div>
</template>
<script>
	export default {
		name: 'atom-form',
		data () {
			return {
				form: {
					name: 'form',
					method: 'post',
					action: '/'
				},
				rows: [{
					label: 'Imię',
					required: true,
					type: 'text',
					customClass: false,
					data: false
				}, {
					label: 'Nazwisko',
					required: true,
					type: 'text',
					customClass: false,
					data: false
				}, {
					label: 'Data urodzenia',
					required: true,
					type: 'date',
					customClass: 'js-pikaday',
					data: false
				}, {
					label: 'Data urodzenia',
					required: true,
					type: 'radio',
					customClass: 'js-pikaday',
					data: false
				}, {
					label: 'Data urodzenia',
					required: true,
					type: 'select',
					customClass: 'js-pikaday',
					data: false
				}, {
					label: 'Data urodzenia',
					required: true,
					type: 'checkbox',
					customClass: 'js-pikaday',
					data: false
				}, {
					label: 'Data urodzenia',
					required: true,
					type: 'textarea',
					customClass: 'js-pikaday',
					data: false
				}],
				submit: {
					type: 'button',
					text: 'Wyślij'
				}
			}
		}
	}
</script>