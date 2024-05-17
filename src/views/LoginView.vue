<template>
	<div class="common-layout">
		<el-container>
			<el-header class="header1" :height="'85px'">
				<div class="brand">
					<img src="@/assets/images/logo.svg" />
				</div>
				<img class="notify" src="@/assets/images/bell.svg" alt="">
			</el-header>
			<el-main>
				<el-row justify="center">
					<el-col :xs="23" :sm="18" :md="15" :lg="10">
						<el-card>
							<h3>Login</h3>
							<p class="subtitle">PLEASE ENTER YOUR EMAIL AND PASSWORD TO CONTINUE</p>
							<form action="" @submit.prevent="loginHandler">
								<div>
									<label for="email">
										Email
										<input type="text" id="email" placeholder="Please enter your email" v-model="email"
											required>
									</label>
									<label for="password">
										Password
										<input type="password" id="password" placeholder="Please enter your password" required
											v-model="password">
									</label>
								</div>
								<dark-button>Login</dark-button>
							</form>
						</el-card>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const loginHandler = () => {
	const data = {
		username: email.value,
		password: password.value
	}
	authStore.login(data).then(() => {
		router.replace('/')
	})
}
</script>

<style lang="scss" scoped>
.header1 {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.brand {
		img {

			width: 300px;
		}
	}

	.notify {
		width: 50px;
	}
}

.el-main {
	min-height: 100vh;
	background: rgb(4, 23, 139);
	background: linear-gradient(200deg, rgba(4, 23, 139, 1) 10%, rgba(82, 139, 255, 1) 100%);

	.el-card {
		color: #06002E;
		padding: 30px 50px 40px;
		border-radius: 30px;

		h3 {
			text-align: center;
			font-size: 60px;
			font-weight: 700;
			margin-bottom: 30px;
			text-transform: uppercase
		}

		.subtitle {
			text-align: center;
			font-size: 20px;
			margin-bottom: 30px;
		}

		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30px;

			div {
				padding: 50px 40px 30px;
				border: 3px solid #06002E;
				border-radius: 30px;

				label {
					padding-left: 25px;
					font-size: 20px;
					font-weight: 600;
				}

				input {
					width: 100%;
					padding: 15px 20px;
					border: 3px solid #06002E;
					border-radius: 25px;
					margin-bottom: 25px;
					font-size: 20px;
				}

			}


		}
	}
}
</style>