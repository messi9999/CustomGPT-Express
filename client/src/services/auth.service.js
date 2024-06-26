import axios from "axios";
import { BASEURL } from "config/config";

const API_URL = BASEURL + "/api/auth/";

const register = (username, email, password) => {
  return axios
    .post(API_URL + "signup", {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.email) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  // localStorage.removeItem("token")
  // return axios.post(API_URL + "signout").then((response) => {
  //   return response.data;
  // });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
