<template>
	<component :is="layout">
		<RouterView />
	</component>
</template>


<script>
import mainLayout from './layouts/mainLayout.vue';
import emptyLayout from './layouts/emptyLayout.vue';
import { RouterView, useRoute } from 'vue-router'
import { computed, defineComponent } from 'vue';

export default defineComponent({
	components: {
		emptyLayout,
		mainLayout
	},
	setup() {
		const route = useRoute()
		const layout = computed(() => {
			return route.meta.layout + 'Layout'
		})
		return {
			layout
		}
	}
})
</script>



<style lang="scss" scoped></style>
