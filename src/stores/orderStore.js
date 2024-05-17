import { ref } from "vue";
import { defineStore } from "pinia";
import OrderService from "@/server/orders";
export const useOrderStore = defineStore("orders", () => {
   const orders = ref(null);
   const pageSize = ref(1);
   const currentPage = ref(1);
   const isLoading = ref(false);
   const errors = ref(null);
   function getOrders(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.getOrders(payload)
            .then((response) => {
               orders.value = response.data.data?.results;
               pageSize.value = response.data.data.page_size || 1;
               currentPage.value = response.data.data.current_page || 1;
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function searchOrders(search) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.searchOrders(search)
            .then((response) => {
               orders.value = response.data.results;
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
   function filterOrderByStatus(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.filterOrderByStatus(payload)
            .then((response) => {
               orders.value = response.data.data?.results;
               pageSize.value = response.data.data.page_size || 1;
               currentPage.value = response.data.data.current_page || 1;
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function filterOrderByToday(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.filterOrderByToday(payload)
            .then((response) => {
               orders.value = response.data.data?.results;
               pageSize.value = response.data.data.page_size || 1;
               currentPage.value = response.data.data.current_page || 1;
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function filterOrderByDate(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.filterOrderByDate(payload)
            .then((response) => {
               orders.value = response.data.data?.results;
               pageSize.value = response.data.data.page_size || 1;
               currentPage.value = response.data.data.current_page || 1;
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function postOrders(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.postOrders(payload)
            .then((response) => {
               isLoading.value = false;
               resolve(response.data);
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function updateOrders(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.updateOrders(payload)
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
   function deleteOrders(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         OrderService.deleteOrders(payload)
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
      errors,
      orders,
      pageSize,
      currentPage,
      getOrders,
      searchOrders,
      postOrders,
      updateOrders,
      deleteOrders,
      filterOrderByStatus,
      filterOrderByToday,
      filterOrderByDate,
   };
});
