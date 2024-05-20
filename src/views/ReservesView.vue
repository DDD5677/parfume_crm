<template>
	<div class="reserves">
		<div class="top">
			<div class="top-left">
				<h1 class="title">Zaxira</h1>
				<el-divider direction="vertical" />
				<div class="route">
					<span>Home</span>
					<span> > </span>
					<span class="active">Zaxira</span>
				</div>
			</div>
			<div class="top-right">
				<el-input v-model="search" style="width: 600px;" size="large" placeholder="Qidiruv" :suffix-icon="Search" />
				<div class="btns">
					<el-select v-model="filter" size="large" style="width: 150px;">
						<el-option label="Barchasi" value="all" />
						<el-option label="Kam qolgan" value="less" />
						<el-option label="Tugagan" value="finished" />
					</el-select>
					<dark-button v-if="selectedOrders.length > 0" @click="calculateTotal" size="12px"><el-icon size="22px">
							<Coin />
						</el-icon></dark-button>
					<dark-button @click="handleAdd" size="20px">Qo'shish</dark-button>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="table">
				<el-table :data="reserveStore.reserves" style="width: 100%" v-loading="reserveStore.isLoading"
					element-loading-text="Loading..."
					:header-cell-style="{ textTransform: 'uppercase', color: '#000', padding: '20px 8px' }"
					:cell-style="{ padding: '20px 8px' }" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="product_name" label="Nomi" align="center" />
					<el-table-column prop="count" label="Soni" align="center" />
					<el-table-column prop="sell_price" label="Sotuv Narxi" align="center" />
					<el-table-column prop="buy_price" label="Olingan Narxi" align="center" />
					<el-table-column prop="updated_at" label="Sana" :formatter="formatterDate" align="center" />
					<el-table-column align="center" width="160">
						<template #header>
							Amal
						</template>
						<template #default="scope">
							<el-button @click="handleEdit(scope.$index, scope.row)" :icon="Edit" style="font-size: 20px;">

							</el-button>
							<el-button type="primary" @click="handleHistory(scope.$index, scope.row)" :icon="Histogram"
								style="font-size: 20px;">

							</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="table-footer">
					<el-pagination :current-page="reserveStore.currentPage" background :hide-on-single-page="true"
						layout="prev, pager, next" @current-change="handleCurrentChange"
						:page-count="reserveStore.pageSize" />
				</div>
			</div>
		</div>

		<el-drawer v-model="drawerReserve" size="40%" :with-header="false">
			<div class="product_edit">
				<h3>Zaxira qo'shish</h3>
				<el-form :model="reserve" label-position="left" label-width="auto">
					<el-form-item label="Mahsulot nomi">
						<el-select v-model="reserve.product" filterable remote placeholder="Nomi"
							:remote-method="searchProducts" :loading="productStore.isLoading">
							<el-option v-for="item in productStore.products" :key="item.id" :label="item.name"
								:value="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="Olingan narxi">
						<el-input v-model="reserve.buy_price" type="number" placeholder="Olingan narxi" clearable />
					</el-form-item>
					<el-form-item label="Sotish narxi">
						<el-input v-model="reserve.sell_price" type="number" placeholder="Sotish narxi" clearable />
					</el-form-item>
					<el-form-item label="Soni">
						<el-input v-model="reserve.count" type="number" placeholder="Soni" clearable />
					</el-form-item>
					<el-form-item>
						<dark-button size="20px" type="primary" style="margin-top:30px; margin-left: auto;"
							@click.prevent="postReserves">Qo'shish</dark-button>
					</el-form-item>
				</el-form>
			</div>
		</el-drawer>
		<el-drawer v-model="drawerReserveUpdate" size="40%" :with-header="false">
			<div class="product_edit">
				<h3> Tahrirlash</h3>
				<el-form :model="reserve" label-position="left" label-width="auto">
					<el-form-item label="Mahsulot nomi">
						<el-select v-model="reserve.product" filterable remote placeholder="Nomi"
							:remote-method="searchProducts" :loading="productStore.isLoading">
							<el-option v-for="item in productStore.products" :key="item.id" :label="item.name"
								:value="item.id" />
						</el-select>
					</el-form-item>
					<el-form-item label="Olingan narxi">
						<el-input v-model="reserve.buy_price" placeholder="Olingan narxi" clearable />
					</el-form-item>
					<el-form-item label="Sotish narxi">
						<el-input v-model="reserve.sell_price" placeholder="Sotish narxi" clearable />
					</el-form-item>
					<el-form-item label="Soni">
						<el-input v-model="reserve.count" placeholder="Soni" clearable />
					</el-form-item>
					<el-form-item>
						<dark-button size="20px" type="primary" style="margin-top:30px; margin-left: auto;"
							@click.prevent="updateReserves">Tahrirlash</dark-button>
					</el-form-item>
				</el-form>
			</div>
		</el-drawer>
		<el-drawer v-model="drawerReserveHistory" size="60%" :with-header="false">
			<div class="table">
				<h3>{{ reserveHistoryTitle }} Zaxira tarixi</h3>
				<el-table :data="reserveStore.historyReserves" style="width: 100%" v-loading="reserveStore.historyLoading"
					element-loading-text="Loading..."
					:header-cell-style="{ textTransform: 'uppercase', color: '#000', padding: '20px 8px' }"
					:cell-style="{ padding: '20px 8px' }">
					<el-table-column prop="count" label="Soni" align="center" />
					<el-table-column prop="sell_price" label="Sotuv Narxi" align="center" />
					<el-table-column prop="buy_price" label="Olingan Narxi" align="center" />
					<el-table-column prop="created_at" label="Sana" :formatter="formatterDate" align="center" />

				</el-table>
				<div class="table-footer">
					<el-pagination :current-page="reserveStore.currentPage" background :hide-on-single-page="true"
						layout="prev, pager, next" @current-change="handleCurrentChange"
						:page-count="reserveStore.pageSize" />
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { Search, Edit, Histogram } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { useReserveStore } from '@/stores/reserveStore'
import { dateFormat } from '@/helpers/formatDate';
import { useProductStore } from '@/stores/productStore';
import { useRoute, useRouter } from 'vue-router';
import { Coin } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';
import { useNotificationStore } from '@/stores/notificationStore';
const router = useRouter()
const route = useRoute()
//stores
const reserveStore = useReserveStore()
const productStore = useProductStore()
const notificationStore = useNotificationStore()
//date formatter
const formatterDate = (row, column, date, index) => {
	return dateFormat(date)
}

//selected
const selectedOrders = ref([])
const handleSelectionChange = (orders) => {
	selectedOrders.value = orders
}

//calculate total price
const calculateTotal = () => {
	const total = selectedOrders.value.reduce((a, b) => a + b.sell_price * b.count, 0)
	ElNotification({
		title: 'Jami',
		message: String(total),
		type: 'info',
	})
}
const reserve = reactive({
	product: null,
	buy_price: null,
	sell_price: null,
	count: null,
})


//filter
const filter = ref('all')
watch(filter, () => {
	router.replace({ name: 'reserves', query: { filter: filter.value } })
	reserveStore.getReserves({ page: 1, filter: filter.value })

})

//pagination
const handleCurrentChange = (val) => {
	reserveStore.getReserves({ page: val, filter: filter.value })
}


//searchReserves
const search = ref('')
watch(search, () => {
	reserveStore.searchReserves({ search: search.value })
})
//searchProducts
const searchProducts = (search) => {
	productStore.searchProducts({ search: search })
}
//add Reserves
const drawerReserve = ref(false)
const handleAdd = () => {
	reserve.product = null;
	reserve.buy_price = null;
	reserve.sell_price = null;
	reserve.count = null;
	drawerReserve.value = true
}
const postReserves = () => {
	reserveStore.postReserves(reserve).then(res => {
		if (res.success) {
			ElNotification.success({
				title: 'Success',
				message: 'Zaxira muvaffaqiyatli yaratildi',
			})
		} else {
			ElNotification.error({
				title: 'Error',
				message: 'Bunday zaxira mavjud',
			})
		}
	}).catch(err => {
		if (err) {
			ElNotification.error({
				title: 'Error',
				message: "Xatolik qayta urinib ko'ring",
			})
		}
	})
}
//edit Reserves
const drawerReserveUpdate = ref(false)
const editedReserveId = ref(null)
const handleEdit = (index, item) => {
	productStore.searchProducts({ search: item.product })
	reserve.product = item.product
	reserve.buy_price = item.buy_price;
	reserve.sell_price = item.sell_price;
	reserve.count = item.count;
	editedReserveId.value = item.id
	drawerReserveUpdate.value = true
}
const updateReserves = () => {
	const data = {
		id: editedReserveId.value,
		product: +reserve.product,
		sell_price: +reserve.sell_price,
		buy_price: +reserve.buy_price,
		count: +reserve.count,
	}
	reserveStore.updateReserves(data).then((res) => {
		ElNotification({
			title: "Zaxira tahrirlandi",
			type: 'success',
		})
		notificationStore.deleteNotification(notificationStore.deletedNotifyId).then((res) => {
			notificationStore.getNotifications()
		})
		reserveStore.getReserves({ page: 1, filter: filter.value })
		drawerReserveUpdate.value = false;
		router.replace({ name: 'reserves' })
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}


//history Reserves
const reserveHistoryTitle = ref('')
const drawerReserveHistory = ref(false)
const handleHistory = (index, item) => {
	reserveStore.getReserveHistory({ id: item.id })
	reserveHistoryTitle.value = item.product_name
	drawerReserveHistory.value = true
}
onMounted(() => {
	filter.value = route.query.filter || 'all'
	//getReserves
	reserveStore.getReserves({ page: 1, filter: filter.value })
	//check query params
	if (route.query.reserve_id) {
		reserveStore.getOneReserves(route.query.reserve_id).then((item) => {
			productStore.searchProducts({ search: item.product })
			reserve.product = item.product
			reserve.buy_price = item.buy_price;
			reserve.sell_price = item.sell_price;
			reserve.count = item.count;
			editedReserveId.value = item.id
			drawerReserveUpdate.value = true
		})
	}
})
</script>

<style lang="scss">
.reserves {
	margin-bottom: 200px;

	.top {
		margin-bottom: 38px;

		.top-left {
			gap: 16px;
			display: flex;
			align-items: center;
			margin-bottom: 20px;
		}

		.top-right {
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 20px;

			.btns {
				display: flex;
				align-items: center;
				gap: 20px;

				.el-select {

					.el-select__wrapper {
						font-size: 16px;
					}
				}
			}
		}

		.el-divider {
			height: 70px;
			width: 2px;
			background-color: black
		}
	}


	.table {
		h3 {
			font-size: 35px;
			margin-bottom: 20px;
			color: #04178b;
			font-weight: 700;
			text-transform: capitalize;
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

	.el-drawer {
		.table-footer {
			justify-content: flex-end;
		}
	}
}
</style>