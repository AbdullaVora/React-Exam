import axios from "axios";

export const apiInstance = axios.create({
    baseURL: import.meta.env.API_URL
})
