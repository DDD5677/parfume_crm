import axios from "./axios";
const DashboardService = {
   getStatistics(payload) {
      return axios.get(`/kirim-chiqim/${payload}`);
   },
   getDiagram(payload) {
      return axios.get(`/diagram/${payload}`);
   },
   getChart() {
      return axios.get(`/report-about-paymant-method/`);
   },
   getTopBrands() {
      return axios.get("/thebest-seller-brand/");
   },
   getTopProducts() {
      return axios.get("/themost-sold-products/");
   },
};

export default DashboardService;
