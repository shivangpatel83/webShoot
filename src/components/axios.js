import axios from "axios";

export const myAxios = axios.create({
    baseURL: " https://httpbin.org",
    headers:{
        Accept: "*/*",
        "Content-Type": "multipart/form-data"
    },
    timeout: 5000
})