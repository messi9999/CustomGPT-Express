import axios from "axios";

const API_URL = "/api/auth/";

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
  // return axios.post(API_URL + "signout").then((response) => {
  //   return response.data;
  // });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const updateCurrentUser = () => {};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
