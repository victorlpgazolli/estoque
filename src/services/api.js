import axios from 'axios'

var local = 'http://192.168.0.104:3333'
const api = axios.create({
    baseURL: local
})
export default api;