import axios from "axios";
import AuthService from "./auth.service";

// const BASE_URL = "http://localhost:8080";
const BASE_URL = ""
const API_URL = BASE_URL + "/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = (userId) => {
  const currentUser = AuthService.getCurrentUser();
  return axios
    .post(
      API_URL + "user",
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": currentUser.accessToken,
        },
      }
    )
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch((error) => {
      alert(error.message);
    });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const getAllUsers = () => {
  const currentUser = AuthService.getCurrentUser();
  return axios.post(
    API_URL + "getAllUsers",
    {
      userId: currentUser.id,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": currentUser.accessToken,
      },
    }
  );
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getAllUsers,
};

export default UserService;
