import axios from 'axios'

var host = 'http://estoque_backend.serveo.net' // 
var local = 'http://localhost:3000'
const api = axios.create({
    baseURL: host
})
export default api;