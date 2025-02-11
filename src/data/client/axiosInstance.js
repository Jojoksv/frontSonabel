import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const ENV = import.meta.env.VITE_ENV;

const cureentUrl = ENV === "PROD" ? url : "http://localhost:3000";

const axiosInstance = axios.create({
    baseURL: cureentUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
)

export default axiosInstance;