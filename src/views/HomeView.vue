<template>
	<div class="home">
		<div class="top">
			<div class="top-left">
				<h1 class="title">Dashboard</h1>
				<el-divider direction="vertical" />
				<div class="route">
					<span>Home</span>
					<span> > </span>
					<span class="active">Dashboard</span>
				</div>
			</div>
			<div class="top-right">
				<el-select v-model="statisticsData" placeholder="Select" size="large" style="width: 180px;">
					<el-option label="Kunlik" value="today" />
					<el-option label="Haftalik" value="weekly" />
					<el-option label="Oylik" value="monthly" />
				</el-select>
			</div>
		</div>
		<div class="statistics">
			<el-row justify="space-around">
				<el-col :span="5">
					<el-skeleton :loading="dashboardStore.isLoading" animated>
						<template #template>
							<el-skeleton-item variant="caption" style="height: 153px" />
						</template>
						<template #default>

							<el-card style="max-width: 480px">
								<div class="card-header">
									<span>Kirim</span>
									<img src="@/assets/images/kirim.svg" alt="">
								</div>
								<div class="amount">
									{{ dashboardStore.statistics.kirim }}sum
								</div>
							</el-card>
						</template>
					</el-skeleton>
				</el-col>
				<el-col :span="5">
					<el-skeleton :loading="dashboardStore.isLoading" animated>
						<template #template>
							<el-skeleton-item variant="caption" style="height: 153px;" />
						</template>
						<template #default>

							<el-card style="max-width: 480px">
								<div class="card-header">
									<span>Chiqim</span>
									<img src="@/assets/images/chiqim.svg" alt="">
								</div>
								<div class="amount">
									{{ dashboardStore.statistics.chiqim }}sum
								</div>
							</el-card>
						</template>
					</el-skeleton>

				</el-col>
				<el-col :span="5">
					<el-skeleton :loading="dashboardStore.isLoading" animated>
						<template #template>
							<el-skeleton-item variant="caption" style="height: 153px" />
						</template>
						<template #default>

							<el-card style="max-width: 480px">
								<div class="card-header">
									<span>Xarid</span>
									<img src="@/assets/images/xarid.svg" alt="">
								</div>
								<div class="amount">
									{{ dashboardStore.statistics.xarid }}ta
								</div>
							</el-card>
						</template>
					</el-skeleton>

				</el-col>
				<el-col :span="5">
					<el-skeleton :loading="dashboardStore.isLoading" animated>
						<template #template>
							<el-skeleton-item variant="caption" style="height: 153px" />
						</template>
						<template #default>

							<el-card style="max-width: 480px">
								<div class="card-header">
									<span>Foyda</span>
									<img src="@/assets/images/foyda.svg" alt="">
								</div>
								<div class="amount">
									{{ dashboardStore.statistics.foyda }}sum
								</div>
							</el-card>
						</template>
					</el-skeleton>

				</el-col>
			</el-row>

		</div>
		<div class="graph">
			<h2>Sotuv</h2>
			<div>
				<el-skeleton :loading="diagramLoading" animated>
					<template #template>
						<el-skeleton-item variant="rect" style="height: 400px;"></el-skeleton-item>
					</template>
					<template #default>
						<Line class="line-graph" :data="data" :options="options" />

					</template>
				</el-skeleton>
			</div>
		</div>
		<div class="brands">
			<h3>Top brandlar</h3>
			<div class="brands_inner">
				<div class="table">

					<el-table :data="dashboardStore.topBrands" style="width: 100%" v-loading="dashboardStore.brandLoading"
						element-loading-text="Loading..."
						:header-cell-style="{ textTransform: 'uppercase', color: '#000', padding: '20px 8px' }"
						:cell-style="{ padding: '20px 8px' }">
						<el-table-column prop="name" label="Brand nomi" class-name="first-column" />
						<el-table-column prop="total_count" label="Xaridlar soni" align="center" />
						<el-table-column prop="total_price" label="Umumiy xarid" align="center" />
					</el-table>
				</div>
				<div class="graphChart">

					<el-skeleton :loading="chartLoading" animated style="">
						<template #template>
							<el-skeleton-item variant="rect" style="height: 300px; background-color: blue;"></el-skeleton-item>
							<div style="
            					display: flex;
            					align-items: center;
            					justify-items: center;
									flex-direction: column;
									gap:10px;
									margin-top: 15px;
          					">
								<el-skeleton-item variant='h3' style="width:50%; height: 30px;"></el-skeleton-item>
								<el-skeleton-item style="width:70%;"></el-skeleton-item>
							</div>
						</template>
						<template #default>
							<div>
								<Doughnut :data="dataChart" :options="optionsChart" />
							</div>
							<h4>Umumiy</h4>
							<div class="total">{{ dashboardStore.totalPrice }}</div>
						</template>

					</el-skeleton>



				</div>
			</div>
		</div>
		<div class="brands">
			<h3>Top Mahsulotlar</h3>
			<div class="table">

				<el-table :data="dashboardStore.topProducts" style="width: 100%" v-loading="dashboardStore.productLoading"
					element-loading-text="Loading..."
					:header-cell-style="{ textTransform: 'uppercase', color: '#000', padding: '20px 8px' }"
					:cell-style="{ padding: '20px 8px' }">
					<el-table-column prop="product_name" label="Brand nomi" class-name="first-column" />
					<el-table-column prop="total_count" label="Xaridlar soni" align="center" />
					<el-table-column prop="total_price" label="Umumiy xarid" align="center" />
				</el-table>
			</div>

		</div>
	</div>
</template>

<script setup>
import { useDashboardStore } from '@/stores/dashboardStore';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	ArcElement,
	Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ref, watch } from 'vue';
import { Line, Doughnut } from 'vue-chartjs'

const dashboardStore = useDashboardStore()
const statisticsData = ref('today')
const diagramLoading = ref(true)
const chartLoading = ref(true)
const data = ref(null);
const dataChart = ref(null)
//get DiagramData
dashboardStore.getDiagram(statisticsData.value).then((diagram) => {
	data.value = {
		labels: diagram.labels,
		datasets: [
			{
				label: 'Data One',
				backgroundColor: ' #04178b50',
				borderColor: ' #04178b80',
				data: diagram.values,
				fill: true,
			}
		]
	}
	diagramLoading.value = false
})
//get statistica
dashboardStore.getStatistics(statisticsData.value)
watch(statisticsData, () => {
	diagramLoading.value = true
	dashboardStore.getStatistics(statisticsData.value)
	dashboardStore.getDiagram(statisticsData.value).then((diagram) => {
		data.value = {
			labels: diagram.labels,
			datasets: [
				{
					label: 'Data One',
					backgroundColor: ' #04178b50',
					borderColor: ' #04178b80',
					data: diagram.values,
					fill: true,
				}
			]
		}
		diagramLoading.value = false
	})

})
//get ChartData
dashboardStore.getChart().then((chartData) => {
	dataChart.value = {
		labels: ['Naqt pul orqali', 'Plastik orqali'],
		datasets: [
			{
				backgroundColor: ['#000958', '#FF9C41'],
				data: chartData
			}
		]
	}
	chartLoading.value = false
})

//get top brands
dashboardStore.getTopBrands()

//get top products
dashboardStore.getTopProducts()




//options of Charts
const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false,
			labels: {
				font: {
					size: 20
				}
			}
		},
		datalabels: {
			display: false
		}
	},
	scales: {
		x: {
			ticks: {
				font: {
					size: 16
				}
			}
		},
		y: {
			min: 0,
			//suggestedMin: 0,
			//suggestedMax: 5000000,
			ticks: {
				font: {
					size: 16
				},
				callback: function (value, index, values) {
					return value + ' sum';
				}
			}
		}
	}
}

const optionsChart = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: 'bottom',
			labels: {
				font: {
					size: 16,
					color: 'rgb(0,0,0)'
				}
			}
		},
		datalabels: {
			formatter: (value, ctx) => {
				let sum = 0;
				let dataArr = ctx.chart.data.datasets[0].data;
				dataArr.map(data => {
					sum += data;
				});
				let percentage = (value * 100 / sum).toFixed(2) + "%";
				return percentage;
			},
			color: '#fff',
			labels: {
				value: {
					font: {
						size: 16
					}
				}
			}
		}
	}
}
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	ArcElement,
	ChartDataLabels
)
</script>

<style lang="scss">
.home {
	margin-bottom: 200px;

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 38px;

		&-left {
			align-items: center;
			gap: 16px;
			display: flex;
		}

		.el-select {
			border-radius: 20px;
			width: 100px;

			div {
				color: white;
			}

			div.el-select__wrapper {
				font-size: 20px;
				text-transform: uppercase;
				padding: 15px 20px;
				border-radius: 20px;
				background-color: #04178B;
			}
		}

		.el-divider {
			height: 70px;
			width: 2px;
			background-color: black
		}
	}

	.statistics {
		margin-bottom: 38px;

		.el-card {
			border-radius: 28px;
			box-shadow: -5px 21px 40px -7px rgba(0, 0, 0, 0.3);
			-webkit-box-shadow: -5px 21px 40px -7px rgba(0, 0, 0, 0.3);
			-moz-box-shadow: -5px 21px 40px -7px rgba(0, 0, 0, 0.3);
		}

		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 15px;
			font-size: 17px;
			text-transform: uppercase;
		}

		.amount {
			text-align: center;
			font-size: 35px;
			font-weight: 600;
			margin-bottom: 32px;
		}
	}

	.graph {
		padding: 20px;
		border-radius: 20px;
		border: 3px solid #000;
		margin-bottom: 50px;

		h2 {
			font-size: 50px;
			font-weight: 600;
			margin-bottom: 20px;
		}

		.line-graph {
			min-height: 400px;
		}
	}

	.brands {
		h3 {
			font-size: 50px;
			font-weight: 600;
			text-transform: uppercase;
			text-align: center;
			margin-bottom: 50px;
		}


		.first-column {
			text-transform: uppercase
		}

		.el-table {

			font-size: 16px;
			color: #000;
		}

		.brands_inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 100px;
			margin-bottom: 80px;

			.table {
				flex-grow: 1;

			}

			.graphChart {
				flex-basis: 400px;
				padding: 40px;
				border: 3px solid #000;
				border-radius: 20px;
				text-align: center;

				h4 {
					font-size: 35px;
					font-weight: 600;
					margin-bottom: 10px;
				}

				.total {
					font-size: 20px;
					font-weight: 600;
				}
			}
		}
	}
}
</style>