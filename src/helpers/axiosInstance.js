import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/v1'
export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})