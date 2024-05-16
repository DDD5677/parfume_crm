<template>
	<button v-if="!to" class="btn">
		<slot></slot>
	</button>
	<Router-link v-else :to="to" class="btn">
		<slot></slot>
	</Router-link>
</template>

<script setup>
const props = defineProps({
	to: {
		type: Object
	},
	size: {
		type: String,
		default: '30px'
	}
})
</script>

<style lang="scss" scoped>
.btn {
	text-transform: uppercase;
	padding: 0.6em 1.8em;
	font-size: v-bind(size);
	line-height: 1;
	font-weight: 600;
	color: #fff;
	border-radius: 30px;
	background-color: #06002E;
	cursor: pointer;
}

button[disabled] {
	opacity: 0.4;
	cursor: not-allowed;
}
</style>