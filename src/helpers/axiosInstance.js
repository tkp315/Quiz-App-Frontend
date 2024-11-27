import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const BASE_URL = `${BACKEND_URL}/api/v1`
export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})