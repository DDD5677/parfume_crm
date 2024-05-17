import { ref } from "vue";
import { defineStore } from "pinia";
import ReserveService from "@/server/reserve";
export const useReserveStore = defineStore("reserve", () => {
   const reserves = ref(null);
   const historyReserves = ref(null);
   const pageSize = ref(1);
   const currentPage = ref(1);
   const isLoading = ref(false);
   const historyLoading = ref(false);
   const errors = ref(null);
   function getReserves(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ReserveService.getReserves(payload)
            .then((response) => {
               reserves.value = response.data.data?.results;
               pageSize.value = response.data.data.page_size || 1;
               currentPage.value = response.data.data.current_page || 1;
               isLoading.value = false;
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getOneReserves(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ReserveService.getOneReserves(payload)
            .then((response) => {
               isLoading.value = false;

               resolve(response.data.data);
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getReserveHistory(payload) {
      return new Promise((resolve, reject) => {
         historyLoading.value = true;
         errors.value = null;
         ReserveService.getReserveHistory(payload)
            .then((response) => {
               historyReserves.value = response.data.store_histories;
               pageSize.value = response.data.page_size || 1;
               currentPage.value = response.data.current_page || 1;
               historyLoading.value = false;
            })
            .catch((error) => {
               historyLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function searchReserves(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ReserveService.searchReserves(payload)
            .then((response) => {
               reserves.value = response.data.results;
               pageSize.value = response.data.page_size || 1;
               currentPage.value = response.data.current_page || 1;
               isLoading.value = false;
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function postReserves(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ReserveService.postReserves(payload)
            .then((response) => {
               isLoading.value = false;
               resolve(response.data);
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
               reject(error);
            });
      });
   }
   function updateReserves(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ReserveService.updateReserves(payload)
            .then((response) => {
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
               reject();
            });
      });
   }

   return {
      isLoading,
      historyLoading,
      historyReserves,
      errors,
      reserves,
      pageSize,
      currentPage,
      getReserves,
      getOneReserves,
      searchReserves,
      postReserves,
      updateReserves,
      getReserveHistory,
   };
});
