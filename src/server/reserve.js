import axios from "./axios";
const ReserveService = {
   getReserves(reserve) {
      return axios.get(`/stores/${reserve.filter}`, {
         params: {
            page: reserve.page,
         },
      });
   },
   searchReserves(payload) {
      return axios.get("/store-search/", {
         params: {
            search: payload.search,
         },
      });
   },
   getReserveHistory(payload) {
      return axios.get(`/store-histories/${payload.id}`, {
         params: {
            page: 1,
         },
      });
   },
   getOneReserves(id) {
      return axios.get(`/store-get-edit/${id}`);
   },
   postReserves(reserve) {
      return axios.post(`/store-create/`, reserve);
   },
   updateReserves(reserve) {
      return axios.patch(`/store-get-edit/${reserve.id}`, reserve);
   },
};

export default ReserveService;
