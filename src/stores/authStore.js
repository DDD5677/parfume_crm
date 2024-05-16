import { ref, computed } from "vue";
import { defineStore } from "pinia";
import AuthService from "../server/auth";
import { setItem } from "@/helpers/localStorage";
export const useAuthStore = defineStore("auth", () => {
   const isLogged = ref(false);
   const isLoading = ref(false);
   const errors = ref(null);
   const accessToken = ref("");

   function login(userData) {
      return new Promise((resolve, reject) => {
         isLoading.value = true;
         errors.value = null;
         isLogged.value = false;
         AuthService.login(userData)
            .then((response) => {
               setItem("accesstoken", response.data.access);
               setItem("refreshtoken", response.data.refresh);
               isLoading.value = false;
               isLogged.value = true;
               console.log(response);
               resolve(true);
            })
            .catch((error) => {
               isLoading.value = false;
               //errors.value = error.response.data;
               console.log(error);
               reject(error.response);
            });
      });
   }

   return { isLogged, isLoading, errors, login };
});
