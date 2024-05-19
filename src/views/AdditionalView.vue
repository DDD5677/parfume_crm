<template>
	<div class="orders">
		<div class="top">
			<div class="top-left">
				<h1 class="title">Qo'shimcha</h1>
				<el-divider direction="vertical" />
				<div class="route">
					<span>Home</span>
					<span> > </span>
					<span class="active">Qo'shimcha</span>
					<span> > </span>
					<span class="active">Kategoriya va Brand</span>
				</div>
			</div>

		</div>
		<div class="body">
			<div class="table">
				<div class="top-table">
					<span class="title"> Kategoriya</span>
					<dark-button @click="openCategoryModal" size="18px">Qo'shish</dark-button>
				</div>
				<el-table :data="categoryStore.categories" style="width: 100%" v-loading="categoryStore.isLoading"
					element-loading-text="Loading..."
					:header-cell-style="{ textTransform: 'uppercase', color: '#000', padding: '20px 8px' }"
					:cell-style="{ padding: '20px 8px' }">
					<el-table-column prop="name" label="Nomi" align="center" />
					<el-table-column prop="product_count" label="Soni" align="center" />
					<el-table-column prop="created_at" label="Sana" :formatter="formatterDate" align="center" />
					<el-table-column align="center" width="160">
						<template #header>
							Amal
						</template>
						<template #default="scope">
							<el-button @click="handleEditCategory(scope.$index, scope.row)" :icon="Edit"
								style="font-size: 20px;">

							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="table-footer" v-if="!categoryStore.isLoading">
					<el-pagination :current-page="categoryStore.currentPage" background layout="prev, pager, next"
						@current-change="handleCategoryPage" :page-count="categoryStore.pageSize"
						:hide-on-single-page="true" />
				</div>
			</div>
			<div class="table">
				<div class="top-table">
					<span class="title"> Brand</span>
					<dark-button @click="openBrandModal" size="18px">Qo'shish</dark-button>
				</div>
				<el-table :data="brandStore.brands" style="width: 100%" v-loading="brandStore.isLoading"
					element-loading-text="Loading..."
					:header-cell-style="{ textTransform: 'uppercase', color: '#000', padding: '20px 8px' }"
					:cell-style="{ padding: '20px 8px' }">
					<el-table-column prop="name" label="Nomi" align="center" />
					<el-table-column prop="product_count" label="Soni" align="center" />
					<el-table-column prop="created_at" label="Sana" :formatter="formatterDate" align="center" />
					<el-table-column align="center" width="160">
						<template #header>
							Amal
						</template>
						<template #default="scope">
							<el-button @click="handleEditBrand(scope.$index, scope.row)" :icon="Edit" style="font-size: 20px;">

							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="table-footer" v-if="!brandStore.isLoading">
					<el-pagination :current-page="brandStore.currentPage" background layout="prev, pager, next"
						@current-change="handleBrandPage" :page-count="brandStore.pageSize" :hide-on-single-page="true" />
				</div>
			</div>
		</div>
	</div>
	<el-dialog v-model="createCategoryModal" title="Kategoriya qo'shish" width="500">
		<div class="dialog_add">
			<el-form label-position="left" label-width="auto">
				<el-form-item>
					<el-input v-model="categoryName" placeholder="Kategoriya nomi" clearable />
				</el-form-item>

				<el-form-item>
					<dark-button size="18px" style="margin-top:30px; margin-left: auto;"
						@click="handlePostCategory">Qo'shish</dark-button>
				</el-form-item>
			</el-form>
		</div>

	</el-dialog>
	<el-dialog v-model="updateCategoryModal" title="Tahrirlash" width="500">
		<div class="dialog_add">
			<el-form label-position="left" label-width="auto">
				<el-form-item>
					<el-input v-model="categoryName" placeholder="Brand nomi" clearable />
				</el-form-item>

				<el-form-item>
					<dark-button size="18px" :disabled="categoryName === updatedCategory?.name"
						style="margin-top:30px; margin-left: auto;"
						@click.prevent="handleUpdateCategory">Saqlash</dark-button>
				</el-form-item>
			</el-form>
		</div>

	</el-dialog>
	<el-dialog v-model="createBrandModal" title="Brand qo'shish" width="500">
		<div class="dialog_add">
			<el-form label-position="left" label-width="auto">
				<el-form-item>
					<el-input v-model="brandName" placeholder="Brand nomi" clearable />
				</el-form-item>

				<el-form-item>
					<dark-button size="18px" style="margin-top:30px; margin-left: auto;"
						@click="handlePostBrand">Qo'shish</dark-button>
				</el-form-item>
			</el-form>
		</div>

	</el-dialog>
	<el-dialog v-model="updateBrandModal" title="Tahrirlash" width="500">
		<div class="dialog_add">
			<el-form label-position="left" label-width="auto">
				<el-form-item>
					<el-input v-model="brandName" placeholder="Brand nomi" clearable />
				</el-form-item>

				<el-form-item>
					<dark-button size="18px" :disabled="brandName === updatedBrand.name"
						style="margin-top:30px; margin-left: auto;" @click.prevent="handleUpdateBrand">Saqlash</dark-button>
				</el-form-item>
			</el-form>
		</div>

	</el-dialog>

</template>

<script setup>
import { Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { useBrandStore } from '@/stores/brandStore.js'
import { useCategoryStore } from '@/stores/categoryStore.js'
import { dateFormat } from '@/helpers/formatDate';
//stores
const categoryStore = useCategoryStore()
const brandStore = useBrandStore()
//format date
const formatterDate = (row, column, date, index) => {
	return dateFormat(date)
}
//Pagination
const handleCategoryPage = (val) => {
	categoryStore.getCategory(val)
}
const handleBrandPage = (val) => {
	brandStore.getBrands(val)
}


//Categories
const createCategoryModal = ref(false)
const updateCategoryModal = ref(false)
const categoryName = ref('')
const updatedCategory = ref(null)

const openCategoryModal = () => {
	categoryName.value = ''
	createCategoryModal.value = true
}

const handlePostCategory = () => {
	categoryStore.postCategory({ name: categoryName.value }).then(() => {
		ElNotification({
			title: "Kategoriya qo'shildi",
			type: 'success',
		})
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}

const handleEditCategory = (index, row) => {
	updateCategoryModal.value = true
	categoryName.value = row.name
	updatedCategory.value = row
}

const handleUpdateCategory = () => {
	categoryStore.updateCategory({ id: updatedCategory.value.id, name: categoryName.value }).then(() => {
		ElNotification({
			title: "Kategoriya tahrirlandi",
			type: 'success',
		})
		categoryStore.getCategory()
		updateCategoryModal.value = false
		categoryName.value = ''
		updatedCategory.value = null
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}

categoryStore.getCategory(1)

//Brands
const createBrandModal = ref(false)
const updateBrandModal = ref(false)
const brandName = ref('')
const updatedBrand = ref(null)

const openBrandModal = () => {
	brandName.value = ''
	createBrandModal.value = true
}

const handlePostBrand = () => {
	brandStore.postBrands({ name: brandName.value }).then(() => {
		ElNotification({
			title: "Brand qo'shildi",
			type: 'success',
		})
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}

const handleEditBrand = (index, row) => {
	updateBrandModal.value = true
	brandName.value = row.name
	updatedBrand.value = row
}

const handleUpdateBrand = () => {
	brandStore.updateBrands({ id: updatedBrand.value.id, name: brandName.value }).then(() => {
		ElNotification({
			title: "Brand tahrirlandi",
			type: 'success',
		})
		brandStore.getBrands()
		updateBrandModal.value = false
		brandName.value = ''
		updatedBrand.value = null
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}

brandStore.getBrands(1)
</script>

<style lang="scss">
.orders {
	margin-bottom: 200px;

	.top {
		margin-bottom: 38px;

		.top-left {
			gap: 16px;
			display: flex;
			align-items: center;
			margin-bottom: 20px;
		}



		.el-divider {
			height: 70px;
			width: 2px;
			background-color: black
		}
	}

	.body {
		display: flex;
		gap: 45px;
		justify-content: space-between;

		.table {
			//flex: 1 0 48%;
			flex-grow: 1;

			.top-table {
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-bottom: 30px;

				.title {
					font-size: 35px;
				}
			}

			.el-table--fit {

				.el-checkbox__inner {
					width: 20px;
					height: 20px;

					&::before {
						top: 8px;
					}

					&:after {
						height: 10px;
						width: 5px;
						left: 6px;
					}
				}
			}

			.table-footer {
				display: flex;
				justify-content: space-around;
				margin-top: 35px;
			}
		}
	}
}

.el-dialog {
	padding: 35px;
	border-radius: 20px;

	.el-dialog__title {
		font-size: 25px;
		font-weight: 700;
		color: #04178b;
	}

	.el-dialog__headerbtn {
		font-size: 25px;
		top: 10px;
		right: 10px;
	}

	.dialog_add {
		margin-top: 25px;

		.el-input__inner {
			padding: 24px 5px;
			font-size: 18px;
		}
	}

}
</style>