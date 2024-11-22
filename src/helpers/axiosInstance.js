import axios from "axios";

const BASE_URL = 'https://quiz-app-s80k.onrender.com/api/v1'
export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})