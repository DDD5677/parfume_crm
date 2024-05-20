<template>
	<div class="common-layout">
		<el-container>
			<el-aside width="230px" class="sidebar">
				<div class="brand">
					<img src="@/assets/images/logo.svg" />
				</div>
				<el-menu a class="menu">
					<RouterLink :to="{ name: 'home' }">
						<el-menu-item index="1">
							<img src="@/assets/images/sidebar/dashboard.svg" />
							<span>Dashboard</span>
						</el-menu-item>
					</RouterLink>
					<RouterLink :to="{ name: 'products' }">
						<el-menu-item index="2">
							<img src="@/assets/images/sidebar/product.svg" />
							<span>Mahsulotlar</span>
						</el-menu-item>
					</RouterLink>
					<RouterLink :to="{ name: 'orders' }">
						<el-menu-item index="3">
							<img src="@/assets/images/sidebar/orders.svg" />
							<span>Xaridlar</span>
						</el-menu-item>
					</RouterLink>
					<RouterLink :to="{ name: 'reserves' }">
						<el-menu-item index="4">
							<img src="@/assets/images/sidebar/sale.svg" />
							<span>Zaxira</span>
						</el-menu-item>
					</RouterLink>
					<RouterLink :to="{ name: 'additional' }">
						<el-menu-item index="5">
							<img src="@/assets/images/sidebar/add-new.svg" />
							<span>Qo'shimcha</span>
						</el-menu-item>
					</RouterLink>
				</el-menu>


			</el-aside>
			<el-container>
				<el-header class="header" :height="'85px'">
					<div style="display: flex; align-items: center;gap: 15px">
						<div class="notify">
							<img src="@/assets/images/bell.svg" alt="" @click="dialogNotification = true">
							<span v-if="notificationStore.notifications?.length" class="notify-count">{{
						notificationStore.notifications?.length }}</span>
						</div>
						<img class="logout" src="@/assets/images/logout.svg" alt="" @click="logout">
					</div>
				</el-header>
				<el-main class="main">
					<slot></slot>
				</el-main>
			</el-container>
		</el-container>
	</div>
	<el-dialog v-model="dialogNotification" title="Bildirishnomalar" class="dialog_layout" width="400" draggable
		:show-close="false">
		<div>
			<h3 v-if="notificationStore.notifications.length === 0"
				style="font-size: 14px;padding-left: 25px;font-weight: 300;">Yangi
				bildirishnomalar yo'q</h3>
			<div v-for="notify in notificationStore.notifications" :key="notify.id" class="notify"
				:class="{ 'read': notify.status }" @click="goToStore(notify)">
				<div>
					<p class="name">{{ notify.name }}</p>
					<span>{{ dateFormat(notify.created_at) }}</span>

				</div>

				<el-button type="danger" :icon="Delete" circle @click.stop.prevent="deleteNotify(notify.id)" />
			</div>
		</div>
	</el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useNotificationStore } from '@/stores/notificationStore';
import { Delete } from '@element-plus/icons-vue'
import { dateFormat } from '@/helpers/formatDate';
import router from '@/router';
//stores
const notificationStore = useNotificationStore()

const dialogNotification = ref(false)
//get notifications
notificationStore.getNotifications()
//delete notification
const deleteNotify = (id) => {
	console.log('delete', id)
	notificationStore.deleteNotification(id).then((res) => {
		dialogNotification.value = false;
		notificationStore.getNotifications()
	})
}
//go to store
const goToStore = (notify) => {
	notificationStore.getOneNotification(notify.id)
	notificationStore.getNotifications()
	notificationStore.changeDeletedNotify(notify.id)
	router.push({ name: 'reserves', query: { reserve_id: notify.store_id } })
	dialogNotification.value = false
}

const logout = () => {
	localStorage.removeItem('refreshtoken')
	localStorage.removeItem('accesstoken')
	router.replace({ name: 'login' })
}
</script>

<style lang="scss">
.sidebar {
	position: fixed;
	background-color: white;
	top: 0;
	left: 0;
	z-index: 5;
	min-height: 100vh;
	box-shadow: 2px -1px 5px 2px rgba(0, 0, 0, 0.1);
	-webkit-box-shadow: 2px -1px 5px 2px rgba(0, 0, 0, 0.1);
	-moz-box-shadow: 2px -1px 5px 2px rgba(0, 0, 0, 0.1);

	.brand {
		overflow: hidden;
		display: flex;
		justify-content: center;

		img {
			transform: scale(1.2);
		}
	}



	.menu {
		.router-link-active {
			.el-menu-item {
				background-color: #04178B;
				border-radius: 14px;
				color: white;

				img {
					filter: brightness(0) invert(1);
				}
			}

		}

		.el-menu-item {
			font-size: 20px;
			font-weight: 700;
			color: #04178B;


			img {
				width: 35px;
				margin-right: 10px;
			}


		}
	}
}



.header {
	padding-left: 250px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	box-shadow: 0px 10px 7px -5px rgba(0, 0, 0, 0.15);
	-webkit-box-shadow: 0px 10px 7px -5px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0px 10px 7px -5px rgba(0, 0, 0, 0.15);

	.el-input {
		font-size: 20px;
		border-radius: 20px;
	}

	.notify {
		position: relative;

		img {
			width: 100%;
		}

		width: 50px;
		cursor: pointer;

	}

	.notify-count {
		width: 25px;
		height: 25px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		position: absolute;
		font-size: 16px;
		top: 0;
		right: 0;
		color: #fff;
		background-color: rgb(227, 40, 40);
	}

	.logout {
		cursor: pointer;
	}
}

.main {
	padding-left: 250px;

	min-height: calc(100vh - 85px);
}

.dialog_layout {
	margin-right: 0;
	margin-top: 90px;
	padding: 25px 0;

	.notify {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 25px;
		background-color: rgb(243, 216, 216);
		border-bottom: 1px solid #04178B;
		cursor: pointer;

		.name {
			font-size: 18px;
		}

		span {
			font-size: 12px;
		}

		&.read {
			background-color: #00000015;
		}
	}

	.el-dialog__header {
		padding: 0 25px 16px;
	}
}


.el-overlay:has(.dialog_layout) {
	background-color: transparent;
}
</style>