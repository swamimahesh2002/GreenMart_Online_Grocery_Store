import axios from "axios";

export const BASE_URL = "http://localhost:8080/greenmart/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});
const token = sessionStorage.getItem("token");

export const myAxiosHeader = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + token,
  },
});
