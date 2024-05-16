import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import { setItem } from "@/helpers/localStorage";
import DashboardService from "@/server/dashboard";

export const useDashboardStore = defineStore("dashboard", () => {
   const statistics = reactive({
      kirim: null,
      chiqim: null,
      xarid: null,
      foyda: null,
   });
   const diagram = reactive({
      labels: null,
      values: null,
   });
   const chartData = ref([0, 0]);
   const totalPrice = ref(2);
   const isLoading = ref(false);
   const errors = ref(null);
   const topBrands = ref(null);
   const brandLoading = ref(false);
   const topProducts = ref(null);
   const productLoading = ref(false);

   function getStatistics(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         DashboardService.getStatistics(payload)
            .then((response) => {
               console.log(response);
               isLoading.value = false;
               statistics.chiqim = response.data.data.chiqim;
               statistics.kirim = response.data.data.kirim;
               statistics.foyda = response.data.data.foyda;
               statistics.xarid = response.data.data.xaridlar_soni;
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getDiagram(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         DashboardService.getDiagram(payload)
            .then((response) => {
               console.log(response);
               isLoading.value = false;
               if (payload === "today") {
                  diagram.labels = Object.keys(response.data.data).map((l) => {
                     return l.split(" ")[1];
                  });
               } else {
                  diagram.labels = Object.keys(response.data.data).map((l) => {
                     return l.split("_")[1];
                  });
               }
               diagram.labels = diagram.labels.reverse();
               diagram.values = Object.values(response.data.data);
               console.log(diagram);
               resolve(diagram);
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getChart() {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         DashboardService.getChart()
            .then((response) => {
               console.log(response);
               isLoading.value = false;
               chartData.value = [
                  response.data.data.total_price_by_cash,
                  response.data.data.total_price_by_card,
               ];
               totalPrice.value = response.data.data.total_price;
               resolve(chartData.value);
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getTopBrands() {
      return new Promise((resolve, reject) => {
         brandLoading.value = true;
         errors.value = null;
         DashboardService.getTopBrands()
            .then((response) => {
               topBrands.value = response.data;
               brandLoading.value = false;
            })
            .catch((error) => {
               brandLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getTopProducts() {
      return new Promise((resolve, reject) => {
         productLoading.value = true;
         errors.value = null;
         DashboardService.getTopProducts()
            .then((response) => {
               topProducts.value = response.data.result;
               productLoading.value = false;
            })
            .catch((error) => {
               productLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }

   return {
      isLoading,
      brandLoading,
      productLoading,
      errors,
      statistics,
      chartData,
      diagram,
      totalPrice,
      topBrands,
      topProducts,
      getTopBrands,
      getTopProducts,
      getStatistics,
      getDiagram,
      getChart,
   };
});
