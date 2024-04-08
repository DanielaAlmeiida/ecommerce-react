import axios from 'axios'

const api = axios.create({
    baseURL: "https://localhost:7229",
})

export default api;