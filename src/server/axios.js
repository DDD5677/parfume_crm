import { getItem, setItem } from "@/helpers/localStorage";
import axios from "axios";
import router from "@/router";

//axios.defaults.baseURL = import.meta.env.VITE_BASE_URL + "/api/v1";
axios.defaults.baseURL = "https://api.mparfume.store/api/v1";
//axios.defaults.baseURL = "http://139.162.109.251:8000/api/v1";

axios.interceptors.request.use((config) => {
   config.headers.Authorization = "Bearer " + getItem("accesstoken");
   return config;
});
let refresh = false;
axios.interceptors.response.use(
   (resp) => resp,
   async (error) => {
      if (error.response.status === 401 && !refresh) {
         refresh = true;
         await axios
            .post("account/token/refresh/", {
               refresh: getItem("refreshtoken"),
            })
            .then((res) => {
               if (res.status === 200) {
                  setItem("accesstoken", res.data.access);
               }
            })
            .catch((err) => {
               if (err) {
                  router.replace("/login");
               }
            });
      }
      refresh = false;
      if (error.response.status === 500 || error.response.status === 404) {
         console.log("error in axios");
         router.replace("/error");
      }
      return Promise.reject(error);
   }
);
export default axios;
