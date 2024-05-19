import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import BrandService from "@/server/brands";
export const useBrandStore = defineStore("brand", () => {
   const brands = ref(null);
   const pageSize = ref(1);
   const currentPage = ref(1);
   const isLoading = ref(false);
   const errors = ref(null);
   function getBrands(page) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         BrandService.getBrands(page)
            .then((response) => {
               brands.value = response.data.data.results;
               pageSize.value = response.data.data.page_size;
               currentPage.value = response.data.data.current_page;
               isLoading.value = false;
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function postBrands(brand) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         BrandService.postBrands(brand)
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
   function updateBrands(brand) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         BrandService.updateBrands(brand)
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
      brands,
      pageSize,
      currentPage,
      getBrands,
      postBrands,
      updateBrands,
   };
});
