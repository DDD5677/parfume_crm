<template>
	<div class="common-layout">
		<div class="login-form">
			<el-row justify="center" style="width:100%">
				<el-col :xs="23" :sm="18" :md="15" :lg="10">
					<el-card>
						<h3>Login</h3>
						<p class="subtitle">PLEASE ENTER YOUR USERNAME AND PASSWORD TO CONTINUE</p>
						<form action="" @submit.prevent="loginHandler">
							<div>
								<label for="email">
									Username
									<input type="text" id="email" placeholder="Please enter your username" v-model="email"
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

		</div>
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
.common-layout {
	background: rgb(4, 23, 139);
	background: linear-gradient(200deg, rgba(4, 23, 139, 1) 10%, rgba(82, 139, 255, 1) 100%);
}

.login-form {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;



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