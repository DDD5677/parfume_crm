<template>
	<div class="products">
		<div class="top">
			<h1 class="title">Mahsulotlar</h1>
			<el-divider direction="vertical" />
			<div class="route">
				<span>Home</span>
				<span> > </span>
				<span class="active">Mahsulotlar</span>
				<span> > </span>
				<span class="active">Mahsulot</span>
			</div>
		</div>
		<div class="body">
			<el-row>
				<el-col :span="24">
					<el-skeleton :loading="productStore.isLoading" animated style="width: 100%;">
						<template #template>
							<div style="display: flex; gap: 25px; width:100%;">
								<el-skeleton-item variant="image"
									style="height: 350px; background-color: blue;flex: 1 0 30%;"></el-skeleton-item>
								<div style="padding: 14px; flex: 0 0 70%;margin-top: 25px;">
									<el-skeleton-item variant="p" style="width: 50%; margin-bottom: 25px;" />
									<div style="
										display: flex;
										align-items: center;
										justify-items: space-between;
										margin-bottom: 25px;
									">
										<el-skeleton-item variant="text" style="width: 60%;" />
									</div>
									<div style="
										display: flex;
										align-items: center;
										justify-items: space-between;
										margin-bottom: 25px;
									">
										<el-skeleton-item variant="text" style="width: 70%;" />
									</div>
									<div style="
										display: flex;
										align-items: center;
										justify-items: space-between;
										margin-bottom: 20px;
									">
										<el-skeleton-item variant="text" style="width: 60%" />
									</div>
									<div style="
										display: flex;
										align-items: center;
										justify-items: space-between;
										margin-bottom: 20px;
									">
										<el-skeleton-item variant="text" style="width: 70%" />
									</div>
								</div>
							</div>
						</template>
						<template #default>
							<div class=" card">
								<div class="img-box">
									<img :src="productStore.oneProduct.image" alt="product image">
								</div>
								<div class="content">
									<div class="name">
										<span>nomi:</span>{{ productStore.oneProduct.name }}
									</div>
									<p class="dsc"><span>Izoh:</span>{{ productStore.oneProduct.description }}</p>
									<ul>
										<li><span>Kategoriya:</span>{{ productStore.oneProduct.category.name }}</li>
										<li><span>brand:</span>{{ productStore.oneProduct.brand.name }}</li>
										<li><span>Hozirgi soni:</span>{{ productStore.oneProduct.currently_product_count
											}}ta</li>
										<li><span>Sotilganlar soni:</span>{{ productStore.oneProduct.sold_product_count
											}}ta</li>
										<li><span>Qo'shilgan sana:</span>{{
					dateFormat(productStore.oneProduct.created_at) }}</li>
									</ul>
								</div>
							</div>

						</template>

					</el-skeleton>

					<div class="btns">
						<dark-button size="25px" @click="handleDeleteProduct">O'chirish</dark-button>
						<dark-button size="25px" @click="drawer = true">Tahrirlash</dark-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>

	<el-drawer v-model="drawer" title="I am the title" size="40%" :with-header="false">
		<div class="product_edit">
			<h3>Tahrirlash</h3>
			<el-form :model="product" label-position="left" label-width="auto">
				<el-form-item label="Nomi">
					<el-input v-model="product.name" placeholder="Mahsulot nomi" clearable />
				</el-form-item>
				<el-form-item label="Ta'rif">
					<el-input v-model="product.desc" placeholder="Ta'rif" type="textarea" clearable />
				</el-form-item>
				<el-form-item label="Kategoriya">
					<el-select v-model="product.category" clearable filterable placeholder="Kategoriya" style="width: 100%">
						<el-option v-for="item in categoryStore.categories" :key="item.id" :label="item.name"
							:value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="Brand">
					<el-select v-model="product.brand" clearable filterable placeholder="Brand" style="width: 100%">
						<el-option v-for="item in brandStore.brands" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="Image">
					<el-upload class="upload-drag" drag :auto-upload="false" accept="image/png, image/jpeg"
						:file-list="product.image" :on-change="handleFile" :limit="1">
						<el-icon class="el-icon--upload"><upload-filled /></el-icon>
						<div class="el-upload__text">
							Rasm yuklash
						</div>
						<template #tip>
							<div class="el-upload__tip">
								jpg/png fayllar hajmi 2Mb dan oshmasin
							</div>
						</template>
					</el-upload>
				</el-form-item>

				<el-form-item>
					<dark-button size="20px" type="primary" @click.prevent="handleUpdateProduct">Saqlash</dark-button>
				</el-form-item>
			</el-form>
		</div>
	</el-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { ElNotification } from 'element-plus'
import { reactive } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';
import { dateFormat } from '@/helpers/formatDate';
import { useBrandStore } from '@/stores/brandStore';
import { useCategoryStore } from '@/stores/categoryStore';
//category
const categoryStore = useCategoryStore()
categoryStore.getCategory()
//brand
const brandStore = useBrandStore()
brandStore.getBrands()

const route = useRoute()
const router = useRouter()
const product = reactive({
	id: route.params.id,
	name: '',
	desc: '',
	category: '',
	brand: '',
	image: [],
})

const handleFile = (file) => {

	if (file.size / 1024 / 1024 > 2) {

		ElNotification({
			title: 'Error',
			message: 'Rasm hajmi 2MB dan oshmasligi lozim!',
			type: 'error',
			customClass: 'errorNotification'
		})
		product.image = []
		return false
	}
	product.image.push(file);


}

const drawer = ref(false)
//get Product
const productStore = useProductStore()
productStore.getOneProduct(route.params.id).then((oneProduct) => {
	product.name = oneProduct.name
	product.desc = oneProduct.description
	product.category = oneProduct.category.id
	product.brand = oneProduct.brand.id
})
//update Product
const handleUpdateProduct = () => {
	productStore.updateProduct(product).then(() => {
		drawer.value = false
		productStore.getOneProduct(route.params.id).then((oneProduct) => {
			product.name = oneProduct.name
			product.desc = oneProduct.description
			product.category = oneProduct.category.id
			product.brand = oneProduct.brand.id
		})
	})
}
//delete Product
const handleDeleteProduct = (id) => {
	productStore.deleteProduct(id).then(
		router.replace({ name: 'products' })
	)
}
</script>

<style lang="scss">
.errorNotification {
	background-color: #ff3333;

	svg {
		color: #fff;
	}

	p,
	h2 {
		color: #fff;
	}
}

.products {
	padding-bottom: 50px;

	.top {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 38px;

		.el-divider {
			height: 70px;
			width: 2px;
			background-color: black
		}
	}

	.card {
		display: flex;
		justify-content: space-between;
		gap: 50px;
		background-color: #fff;
		padding: 30px;
		box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.35);
		-webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.35);
		-moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.35);
		border-radius: 10px;

		.img-box {
			flex: 0 0 30%;
			border-radius: 10px;
			overflow: hidden;
			//max-height: 500px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			font-size: 20px;
			text-transform: capitalize;
			margin-top: 20px;
			flex-grow: 1;

			span {
				font-weight: 700;
				margin-right: 5px;
			}

			.name {
				font-size: 30px;
				margin-bottom: 20px;
			}

			.dsc {
				margin-bottom: 25px;
				text-transform: none;
			}

			ul {
				li {
					margin: 15px 0;
				}
			}
		}
	}

	.btns {
		margin-top: 35px;
		display: flex;
		justify-content: flex-end;
		gap: 35px;
	}


}

.el-drawer {
	.product_edit {
		padding: 30px;

		h3 {
			font-size: 35px;
			margin-bottom: 20px;
			color: #04178b;
			font-weight: 700;
			text-transform: uppercase;
		}

		.el-form-item {
			.el-form-item__label {
				font-size: 20px;
			}

			align-items: center;

			.upload-drag {
				width: 100%;
			}
		}

		textarea {
			font-size: 18px;
			padding: 10px;
		}

		.el-input__inner {
			padding: 24px 5px;
			font-size: 18px;
		}

		.el-select__wrapper {
			height: 50px;
			font-size: 18px;
		}


	}
}
</style>