import axios from "./axios";
const AuthService = {
   login(data) {
      return axios.post("/account/token/", data);
   },
};

export default AuthService;
