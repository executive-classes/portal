import axios from 'axios';
import store from '@/store';

const http = axios.create({
    baseURL: 'http://api.executiveclasses.local/api',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

http.interceptors.request.use(function (config) {
    const token = store.getters.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, function (error) {
    return Promise.reject(error)
})

export default http;