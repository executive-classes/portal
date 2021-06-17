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

// Interceptors for the request
http.interceptors.request.use(function (config) {
    // Add the token to the request.
    const token = store.getters.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, function (error) {
    return Promise.reject(error)
})

// Interceptors for the response
http.interceptors.response.use(function (response) {
    // Format the data from the response.
    let data = response.data;
    data.original = response;

    return data;
}, function (error) {
    // Format the resposne error.
    let data = {};
    data.message = "Erro durante a requisição.";
    data.code = 500;

    if (error.response) {
        data = error.response.data;
        data.code = error.response.status;
        data.original = error.response;

        if (data.code == 401) {
            window.location.href = "/auth/login";
        }

        if (data.code == 422 && Object.keys(data.errors).length !== 0) {
            data.message = data.errors[Object.keys(data.errors)[0]][0];
        }
    } else if (error.request) {
        data.original = error.request;
    }

    return Promise.reject(data);
});

export default http;