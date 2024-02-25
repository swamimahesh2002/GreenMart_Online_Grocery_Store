import axios from 'axios'

export const BASE_URL = "http://localhost:8080/greenmart/";

const token = sessionStorage.getItem("token");

export const myAxios = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     Authorization:
    //         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiaGltYW5zaHVAMTIzIiwiZXhwIjoxNjc4MDQ3MjM4LCJpYXQiOjE2NzgwMTEyMzh9.598px0E1zpxFQ9M3-vK4qgPnSCdzrpN_lq5toSGbH6s",
    // },

})

export const myAxiosHeader = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization:
            "Bearer " + token,
    },

})