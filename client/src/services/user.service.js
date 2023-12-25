import axios from "axios";
import AuthService from "./auth.service";

const API_URL = "/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = (userId) => {
  const currentUser = AuthService.getCurrentUser();
  return axios
    .post(
      API_URL + "user", {
        userId: userId
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": currentUser.accessToken,
        }        
      }
    )
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    }).catch((error) => {
      alert(error.message)
    })
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};

export default UserService;
