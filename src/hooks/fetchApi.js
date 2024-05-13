import axios from "axios";

export const fetchApi = axios.create({
    baseURL: "https://backend-for-easylearn.onrender.com/api"
});
