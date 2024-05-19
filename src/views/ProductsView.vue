<template>
	<div class="products">
		<div class="top">
			<div class="top-left">
				<h1 class="title">Mahsulotlar</h1>
				<el-divider direction="vertical" />
				<div class="route">
					<span>Home</span>
					<span> > </span>
					<span class="active">Mahsulotlar</span>
				</div>
			</div>
			<div class="top-right">
				<dark-button @click="drawer = true" size="22px">Qo'shish</dark-button>
			</div>
		</div>
		<div class="body">

			<el-skeleton :loading="productStore.isLoading" animated style="">
				<template #template>
					<el-row justify="space-between">
						<el-col :span="7" v-for="i in 6" :key="i">

							<el-skeleton-item variant="image"
								style="height: 300px; background-color: blue;"></el-skeleton-item>
							<div style="padding: 14px">
								<el-skeleton-item variant="p" style="width: 50%; margin-bottom: 20px;" />
								<div style="
										display: flex;
										align-items: center;
										justify-items: space-between;
										margin-bottom: 20px;
									">
									<el-skeleton-item variant="text" style="margin-right: 16px" />
									<el-skeleton-item variant="text" style="width: 50%" />
								</div>
								<div style="
										display: flex;
										align-items: center;
										justify-items: space-between;
										margin-bottom: 20px;
									">
									<el-skeleton-item variant="text" style="margin-right: 16px" />
									<el-skeleton-item variant="text" style="width: 50%" />
								</div>
							</div>
						</el-col>
					</el-row>
				</template>
				<template #default>
					<el-row>
						<el-col :span="8" v-for="product in productStore.products" :key="product.id" style="padding: 15px;">
							<Product :product="product" />

						</el-col>
					</el-row>

				</template>

			</el-skeleton>
			<div class="table-footer">
				<el-pagination :current-page="productStore.currentPage" background layout="prev, pager, next"
					@current-change="handleProductPage" :page-count="productStore.pageSize" :hide-on-single-page="true" />
			</div>
		</div>
	</div>
	<el-drawer v-model="drawer" title="I am the title" size="40%" :with-header="false">
		<div class="product_edit">
			<h3>Mahsulot qo'shish</h3>
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
					<dark-button size="20px" type="primary" @click.prevent="handlePostProduct">Qo'shish</dark-button>
				</el-form-item>
			</el-form>
		</div>
	</el-drawer>
</template>

<script setup>
import Product from '@/components/Product.vue'
import { ref } from 'vue';
import { ElNotification } from 'element-plus'
import { reactive } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { useCategoryStore } from '@/stores/categoryStore';
import { useBrandStore } from '@/stores/brandStore';
import { useProductStore } from '@/stores/productStore';
const productStore = useProductStore()
//pagination
const handleProductPage = (val) => {
	productStore.getProducts(val)
}
//getProducts
productStore.getProducts(1)

const product = reactive({
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
const handlePostProduct = () => {
	productStore.postProduct(product)
}
const drawer = ref(false)
//category
const categoryStore = useCategoryStore()
categoryStore.getCategory()
//brand
const brandStore = useBrandStore()
brandStore.getBrands()
</script>

<style lang="scss" scoped>
.products {
	margin-bottom: 200px;

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 38px;

		.top-left {
			gap: 16px;
			display: flex;
			align-items: center;
		}

		.el-divider {
			height: 70px;
			width: 2px;
			background-color: black
		}
	}

	.body {



		.table-footer {
			margin-top: 35px;
			display: flex;
			justify-content: center;
		}
	}
}
</style>