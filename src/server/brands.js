import axios from "./axios";
const BrandService = {
   getBrands(page) {
      return axios.get(`/brands/`, {
         params: {
            page,
         },
      });
   },
   postBrands(brand) {
      return axios.post(`/brand-add/`, brand);
   },
   updateBrands(brand) {
      return axios.patch(`/brand-edit/${brand.id}`, brand);
   },
};

export default BrandService;
