import axios from 'axios'

const api = axios.create({
    baseURL: 'http://estoque_backend.serveo.net'
})
export default api;