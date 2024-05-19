<template>
	<div class="product">
		<div class="img-box">
			<img :src="product.image" alt="">
		</div>
		<div class="content">
			<div class="name">
				<RouterLink :to="{ name: 'single-product', params: { id: product.id } }">{{ product.name }}</RouterLink>
			</div>
			<p class="dsc">{{ product.description }}</p>
			<ul>
				<li><span>brand:</span>{{ product.brand.name }}</li>
				<li><span>Hozirgi soni:</span>{{ product.currently_product_count }}ta</li>
				<li><span>Kategoriya:</span>{{ product.category.name }}</li>
				<li><span>Sotilganlar soni:</span>{{ product.sold_product_count }}ta</li>
				<li><span>Sana:</span>{{ dateFormat(product.created_at) }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { dateFormat } from '@/helpers/formatDate';
const props = defineProps({
	product: {
		type: Object,
		required: true
	}
})
</script>

<style lang="scss" scoped>
.product {
	height: 100%;
	background-color: rgba(236, 236, 246, .439);
	border: 2px solid rgba(236, 236, 246, .439);
	border-radius: 20px;

	.img-box {
		height: 380px;
		border-radius: 16px 16px 0 0;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			transition: all 0.3s ease-in;
			object-fit: cover;

			&:hover {
				transform: scale(1.05);
			}
		}
	}

	.content {
		padding: 15px 25px 30px;
		color: #06002E;


		.name {
			text-transform: uppercase;
			font-size: 25px;
			font-weight: 700;
			text-align: center;
			margin-bottom: 20px;
		}

		.dsc {
			font-size: 14px;

			font-weight: 500;
		}

		ul {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			font-size: 14px;
			margin-top: 25px;

			li {
				flex: 1 0 40%;
				font-weight: 500;
				text-transform: capitalize;

				span {
					font-weight: 700;
					margin-right: 5px;

				}
			}
		}
	}
}
</style>