import axios from "./axios";
const OrderService = {
   getOrders(payload) {
      return axios.get(`/orders/`, {
         params: {
            page: payload.page,
         },
      });
   },
   filterOrderByStatus(payload) {
      return axios.get(`/order-filter-by-payment/${payload.payment}/`, {
         params: {
            page: payload.page,
         },
      });
   },
   filterOrderByDate(payload) {
      return axios.get(`/order-filter-by-dates/`, {
         params: {
            page: payload.page,
            start_date: payload.start_date,
            end_date: payload.end_date,
         },
      });
   },
   filterOrderByToday(payload) {
      return axios.get(`/order-filter-by-today/`, {
         params: {
            page: payload.page,
         },
      });
   },
   searchOrders(search) {
      return axios.get("/order-search/", {
         params: {
            search: search,
         },
      });
   },
   postOrders(order) {
      return axios.post(`/order-create/`, order);
   },
   updateOrders(order) {
      return axios.patch(`/order-crud/${order.id}`, order);
   },
   deleteOrders(id) {
      return axios.delete(`/order-crud/${id}`);
   },
};

export default OrderService;
