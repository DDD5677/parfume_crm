import { ref } from "vue";
import { defineStore } from "pinia";
import ProductService from "@/server/product";
export const useProductStore = defineStore("product", () => {
   const products = ref(null);
   const pageSize = ref(1);
   const currentPage = ref(1);
   const oneProduct = ref(null);
   const isLoading = ref(false);
   const errors = ref(null);
   function getProducts(page) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ProductService.getProducts(page)
            .then((response) => {
               products.value = response.data.data.results;
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
   function searchProducts(payload) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ProductService.searchProducts(payload)
            .then((response) => {
               products.value = response.data.results;
               isLoading.value = false;
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function getOneProduct(id) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         oneProduct.value = null;
         ProductService.getOneProduct(id)
            .then((response) => {
               oneProduct.value = response.data.product_data;
               isLoading.value = false;
               resolve(response.data.product_data);
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function postProduct(product) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ProductService.postProduct(product)
            .then((response) => {
               isLoading.value = false;
               resolve();
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
               reject(error);
            });
      });
   }
   function updateProduct(product) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ProductService.updateProduct(product)
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
   function deleteProduct(id) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         ProductService.deleteProduct(id)
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
      products,
      oneProduct,
      pageSize,
      currentPage,
      getProducts,
      searchProducts,
      getOneProduct,
      postProduct,
      updateProduct,
      deleteProduct,
   };
});
