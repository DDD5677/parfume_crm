import axios from "./axios";
const CategoryService = {
   getCategory(page) {
      return axios.get(`/categories/`, {
         params: {
            page,
         },
      });
   },
   postCategory(category) {
      return axios.post(`/category-add/`, category);
   },
   updateCategory(category) {
      return axios.patch(`/category-edit/${category.id}`, category);
   },
};

export default CategoryService;
