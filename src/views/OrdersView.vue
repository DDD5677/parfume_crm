<template>
	<div class="orders">
		<div class="top">
			<div class="top-left">
				<h1 class="title">Xaridlar</h1>
				<el-divider direction="vertical" />
				<div class="route">
					<span>Home</span>
					<span> > </span>
					<span class="active">Xaridlar</span>
				</div>
			</div>
			<div class="top-right">
				<el-input v-model="orderSearch" style="width: 600px;" size="large" placeholder="Qidiruv"
					:suffix-icon="Search" />
				<div>
					<dark-button v-if="selectedOrders.length > 0" @click="calculateTotal" size="12px"><el-icon size="22px">
							<Coin />
						</el-icon></dark-button>
					<dark-button size="20px" @click="handleFilter">Filter</dark-button>
					<dark-button @click="handleAdd" size="20px">Qo'shish</dark-button>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="table">
				<el-table :data="orderStore.orders" style="width: 100%" v-loading="orderStore.isLoading"
					element-loading-text="Loading..."
					:header-cell-style="{ textTransform: 'uppercase', color: '#000', padding: '20px 8px' }"
					:cell-style="{ padding: '20px 8px' }" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="product_name" label="Nomi" align="center" />
					<el-table-column prop="count" label="Soni" align="center" />
					<el-table-column prop="price" label="Narxi" align="center" />
					<el-table-column prop="payment_method" label="To'lov turi" align="center" />
					<el-table-column prop="created_at" label="Sana" :formatter="formatterDate" align="center" />
					<el-table-column align="center" width="160">
						<template #header>
							Amal
						</template>
						<template #default="scope">
							<el-button @click="handleEdit(scope.$index, scope.row)" :icon="Edit" style="font-size: 20px;">

							</el-button>
							<el-popconfirm width="240" confirm-button-text="Ha" cancel-button-text="Yo'q" :icon="InfoFilled"
								icon-color="#04178b" title="Rostdan ham o'chirishni xohliszmi?"
								@confirm="handleDelete(scope.$index, scope.row)">
								<template #reference>
									<el-button type="danger" :icon="Delete" style="font-size: 20px;">

									</el-button>
								</template>
							</el-popconfirm>

						</template>
					</el-table-column>
				</el-table>
				<div class="table-footer">
					<el-pagination :current-page="orderStore.currentPage" background layout=" prev, pager, next"
						:hide-on-single-page="true" @current-change="handleCurrentChange" :page-count="orderStore.pageSize" />
				</div>
			</div>
		</div>
	</div>
	<el-drawer v-model="drawerOrder" title="I am the title" size="40%" :with-header="false">
		<div class="product_edit">
			<h3>Xarid qo'shish</h3>
			<el-form :model="order" label-position="top" label-width="auto">
				<el-form-item label="Nomi">
					<el-select v-model="order.product" filterable remote placeholder="Nomi" :remote-method="searchReserves"
						@change="handleChange" :loading="reserveStore.isLoading">
						<el-option v-for="item in reserveStore.reserves" :key="item.product" :label="item.product_name"
							:value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="Soni">
					<el-input v-model="order.count" placeholder="Soni" clearable />
				</el-form-item>
				<el-form-item label="Narxi">
					<div style="display: flex; align-items: center;gap: 15px; width: 100%;">
						<el-input v-model="order.price" placeholder="Narxi" clearable disabled style="flex-grow: 1;" />
						<el-button @click="customPrice = !customPrice" type="primary" size="large"
							style="font-size: 18px;padding: 10px 15px;">Boshqa</el-button>
					</div>
				</el-form-item>
				<el-form-item v-if="customPrice" label="Boshqa narx">
					<el-input v-model="order.customPrice" placeholder="Narxi" clearable />
				</el-form-item>
				<el-form-item label="Umumiy narx">
					<el-input v-model="order.totalPrice" placeholder="Umumiy Narxi" clearable disabled />
				</el-form-item>
				<el-form-item label="To'lov turi">
					<el-select v-model="order.payment_method" placeholder="To'lov turi" clearable>
						<el-option label="Naxt pul orqali" value="CASH" />
						<el-option label="Karta orqali" value="CARD" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<dark-button size="20px" type="primary" style="margin-top:30px; margin-left: auto;"
						@click.prevent="postOrder">Qo'shish</dark-button>
				</el-form-item>
			</el-form>
		</div>
	</el-drawer>
	<el-drawer v-model="drawerOrderUpdate" title="I am the title" size="40%" :with-header="false">
		<div class="product_edit">
			<h3>Xarid Tahrirlash</h3>
			<el-form :model="order" label-position="top" label-width="auto">
				<el-form-item label="Nomi">
					<el-select v-model="order.product" filterable remote placeholder="Nomi" :remote-method="searchReserves"
						@change="handleChange" :loading="reserveStore.isLoading">
						<el-option v-for="item in reserveStore.reserves" :key="item.product" :label="item.product_name"
							:value="item.id" />
					</el-select>
				</el-form-item>
				<el-form-item label="Soni">
					<el-input v-model="order.count" placeholder="Soni" clearable />
				</el-form-item>
				<el-form-item label="Narxi">
					<div style="display: flex; align-items: center;gap: 15px; width: 100%;">
						<el-input v-model="order.price" placeholder="Narxi" clearable disabled style="flex-grow: 1;" />
						<el-button @click="customPrice = !customPrice" type="primary" size="large"
							style="font-size: 18px;padding: 10px 15px;">Boshqa</el-button>
					</div>
				</el-form-item>
				<el-form-item v-if="customPrice" label="Boshqa narx">
					<el-input v-model="order.customPrice" placeholder="Narxi" clearable />
				</el-form-item>
				<el-form-item label="Umumiy narx">
					<el-input v-model="order.totalPrice" placeholder="Umumiy Narxi" clearable disabled />
				</el-form-item>
				<el-form-item label="To'lov turi">
					<el-select v-model="order.payment_method" placeholder="To'lov turi" clearable>
						<el-option label="Naxt pul orqali" value="CASH" />
						<el-option label="Karta orqali" value="CARD" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<dark-button size="20px" style="margin-top:30px; margin-left: auto;"
						@click.prevent="updateOrder">Tahrirlash</dark-button>
				</el-form-item>
			</el-form>
		</div>
	</el-drawer>
	<el-dialog v-model="filterOrder" title="Filter" width="700">

		<el-tabs v-model="activeName" type="card" class="demo-tabs">
			<el-tab-pane label="Barchasi" name="all"></el-tab-pane>
			<el-tab-pane label="Bugungi" name="today"></el-tab-pane>
			<el-tab-pane name="status">
				<template #label>
					<el-select v-model="filterByStatus" placeholder="Status" @click="handleStatusChange"
						style="width: 200px; box-shadow:none;">
						<el-option label="Naqt" value="cash" />
						<el-option label="Karta" value="card" />
					</el-select>
				</template>
			</el-tab-pane>
			<el-tab-pane label="Boshqa" name="date">
				<div class="calendar">

					<el-date-picker v-model="calendarValue" type="daterange" range-separator="-->"
						start-placeholder="Sanadan" end-placeholder="Sanagacha" />
				</div>
			</el-tab-pane>
		</el-tabs>

		<template #footer>
			<div class="dialog-footer">
				<el-button @click="filterOrder = false">Bekor qilish</el-button>
				<el-button type="primary" @click.prevent="handleFilterOrders">
					Tasdiqlash
				</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Search, Edit, Delete, Coin, InfoFilled } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import { useOrderStore } from '@/stores/orderStore';
import { dateFormat } from '@/helpers/formatDate';
import { useReserveStore } from '@/stores/reserveStore';
import { ElNotification } from 'element-plus';
import router from '@/router';
//stores
const orderStore = useOrderStore()
const reserveStore = useReserveStore()
//date formatter
const formatterDate = (row, column, date, index) => {
	return dateFormat(date)
}

//selected orders
const selectedOrders = ref([])
const handleSelectionChange = (orders) => {
	selectedOrders.value = orders
}
//calculate total price
const calculateTotal = () => {
	const total = selectedOrders.value.reduce((a, b) => a + b.price * b.count, 0)
	ElNotification({
		title: 'Jami',
		message: String(total),
		type: 'info',
	})
}
//order
const order = reactive({
	product: null,
	count: null,
	price: null,
	customPrice: null,
	payment_method: '',
	totalPrice: 0,
})
//customPrice
const customPrice = ref(false)
//totalPrice
watch(order, () => {
	if (customPrice.value) {

		order.totalPrice = order.count * order.customPrice

	} else {
		order.totalPrice = order.count * order.price
	}
})

//create Order
const drawerOrder = ref(false)
const handleAdd = () => {
	order.price = null;
	order.count = null;
	order.product = null;
	order.customPrice = null;
	drawerOrder.value = true
}
const postOrder = () => {
	const data = {
		store_id: order.product,
		payment_method: order.payment_method,
		count: +order.count,
		price: customPrice.value ? +order.customPrice : +order.price
	}


	orderStore.postOrders(data).then((res) => {

		if (res.success) {
			ElNotification({
				title: "Xarid qo'shildi",
				type: 'success',
			})
		} else {
			ElNotification.error({
				title: 'Error',
				message: res.message,
			})
		}
		orderStore.getOrders({ page: 1 })
		drawerOrder.value = false
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}

//searchReserves
const searchReserves = (search) => {
	reserveStore.searchReserves({ search: search })
}
//update Order
const drawerOrderUpdate = ref(false)
const editedOrderId = ref(null)
const handleEdit = (index, item) => {
	reserveStore.searchReserves({ search: item.product_id })

	order.price = item.price;
	order.count = item.count;
	order.product = item.store_id;
	order.payment_method = item.payment_method
	editedOrderId.value = item.id
	drawerOrderUpdate.value = true
}
const handleChange = (id) => {
	reserveStore.getOneReserves(id).then((item) => {
		order.price = item.sell_price
	})
}
const updateOrder = () => {
	const data = {
		id: editedOrderId.value,
		store_id: order.product,
		payment_method: order.payment_method,
		count: +order.count,
		price: customPrice.value ? +order.customPrice : +order.price
	}

	orderStore.updateOrders(data).then((res) => {
		ElNotification({
			title: "Xarid tahrirlandi",
			type: 'success',
		})
		orderStore.getOrders({ page: 1 })
		drawerOrderUpdate.value = false
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}

//delete Order
const handleDelete = (index, item) => {

	orderStore.deleteOrders(item.id).then((res) => {
		ElNotification({
			title: "Xarid o'chirildi",
			type: 'success',
		})
		orderStore.getOrders({ page: 1 })
	}).catch(() => {
		ElNotification({
			title: "Xatolik",
			type: 'error',
		})
	})
}

//search orders
const orderSearch = ref('')
watch(orderSearch, () => {
	orderStore.searchOrders(orderSearch.value)
})

//filter Orders
const filterOrder = ref(false)
const activeName = ref('all')
const filterByStatus = ref('')
const calendarValue = ref(null)
const handleFilter = () => {
	filterOrder.value = true
}
const handleStatusChange = () => {
	activeName.value = 'status'
}
const handleFilterOrders = () => {
	switch (activeName.value) {
		case 'today':
			orderStore.filterOrderByToday({ page: 1 }).then(() => {
				filterOrder.value = false
			})
			break;
		case 'status':
			orderStore.filterOrderByStatus({ payment: filterByStatus.value, page: 1 }).then((res) => {
				filterOrder.value = false
			})
			break;
		case 'date':
			orderStore.filterOrderByDate({ start_date: dateFormat(calendarValue.value[0]), end_date: dateFormat(calendarValue.value[1]), page: 1 }).then((res) => {
				filterOrder.value = false
			})
			break;
		default:
			orderStore.getOrders({ page: 1 }).then(() => {
				filterOrder.value = false
			})
	}
}


//getOrders
orderStore.getOrders({ page: 1 })
//pagination
const handleCurrentChange = (val) => {
	router.push({ name: 'orders', query: { page: val } })
	switch (activeName.value) {
		case 'today':
			orderStore.filterOrderByToday({ page: val })
			break;
		case 'status':
			orderStore.filterByStatus({ payment: filterByStatus.value, page: val })
			break;
		case 'date':
			orderStore.filterOrderByDate({ page: val, start_date: calendarValue.value, })
			break;
		default: orderStore.getOrders({ page: val })
	}

}


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

		.top-right {
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 15px;

			div {
				display: flex;
				gap: 20px;
			}
		}

		.el-divider {
			height: 70px;
			width: 2px;
			background-color: black
		}
	}

	.body {
		.table {

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


}

.el-tabs {
	#tab-third {
		padding: 0;
	}

	.calendar {
		margin: 20px 0;
		display: flex;
		justify-content: center;
	}

	.el-tabs__header {
		border: none;

		.el-tabs__nav {
			width: 100%;
			justify-content: space-between;
			border: none;

			.el-tabs__item {
				font-size: 18px;
				border: 2px solid #04178b;
				border-radius: 10px;
				color: #04178b;

				&.is-active {
					background-color: #04178b;
					color: #fff;

					&:hover {
						background-color: #04178b;
					}

					.el-select__wrapper {
						div {
							color: white;

						}
					}
				}


				&:hover {
					background-color: var(--el-color-primary-light-8);
				}

				.el-select__wrapper {
					box-shadow: none;
					background-color: transparent;

					&:hover {
						box-shadow: none;
					}

					.el-select__selected-item {
						font-size: 18px;
						color: #04178b;
					}

					.el-select__placeholder.is-transparent {
						color: #04178b;
						font-size: 18px;
					}
				}
			}
		}
	}
}
</style>