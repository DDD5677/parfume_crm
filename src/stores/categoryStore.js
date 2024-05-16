import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import CategoryService from "@/server/category";
export const useCategoryStore = defineStore("category", () => {
   const categories = ref(null);
   const pageSize = ref(1);
   const currentPage = ref(1);
   const isLoading = ref(false);
   const errors = ref(null);
   function getCategory(page) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         CategoryService.getCategory(page)
            .then((response) => {
               categories.value = response.data.data.results;
               pageSize.value = response.data.data.page_size;
               currentPage.value = response.data.data.current_page;
               isLoading.value = false;
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error.response.data;
               console.log(error);
            });
      });
   }
   function postCategory(brand) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         CategoryService.postCategory(brand)
            .then((response) => {
               isLoading.value = false;
            })
            .catch((error) => {
               isLoading.value = false;
               errors.value = error;
               console.log(error);
            });
      });
   }
   function updateCategory(brand) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         CategoryService.updateCategory(brand)
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
      categories,
      pageSize,
      currentPage,
      getCategory,
      postCategory,
      updateCategory,
   };
});
