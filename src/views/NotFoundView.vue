<template>
	<el-container>
		<el-header class="header" :height="'85px'">
			<div class="brand">
				<img src="@/assets/images/logo.svg" />
			</div>
			<img src="@/assets/images/bell.svg" alt="">
		</el-header>
		<el-main>
			<el-row justify="center">
				<el-col :xs="23" :sm="18" :md="15" :lg="10">
					<div class="img-box">
						<img src="@/assets/images/Notfound.svg" alt="">
					</div>
					<p class="text">HMM! NIMADIR XATO KETDI. INTERNET BILAN ALOQANI TEKSHIRING VA QAYTA URINIB KO’RING</p>
					<div class="btns">
						<dark-button @click="goBack" size="20px">Qayta urinish</dark-button>
						<dark-button :to="{ name: 'home', }" replace size="20px" class="light-btn">Asosiy
							oynaga</dark-button>
					</div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const goBack = () => {
	router.back()
}
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0px 10px 7px -5px rgba(0, 0, 0, 0.15);
	-webkit-box-shadow: 0px 10px 7px -5px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0px 10px 7px -5px rgba(0, 0, 0, 0.15);
}


.img-box {
	display: flex;
	justify-content: center;
	margin-bottom: 25px;
}

.text {
	text-align: center;
	font-size: 25px;
	font-weight: 700;
}

.btns {
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	align-items: center
}
</style>