import axios from "axios"

const BASE_URL = 'https://dobby-api.onrender.com/api/v1'

export const API = axios.create({
    baseURL: BASE_URL
})
