import axios from "./axios";
const ProductService = {
   getProducts(page) {
      return axios.get(`/products/`, {
         params: {
            page,
         },
      });
   },
   searchProducts(payload) {
      return axios.get("/product-search/", {
         params: {
            search: payload,
         },
      });
   },
   getOneProduct(id) {
      return axios.get(`/product-get/${id}`);
   },
   postProduct(product) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.desc);
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      if (product.image[0]) formData.append("image", product.image[0].raw);
      return axios.post(`/product-add/`, formData);
   },
   updateProduct(product) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.desc);
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      if (product.image[0]) formData.append("image", product.image[0].raw);
      return axios.patch(`/product-crud/${product.id}`, formData);
   },
   deleteProduct(id) {
      return axios.delete(`/product-crud/${id}`);
   },
};

export default ProductService;
