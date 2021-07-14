import axios from 'axios';
import store from '@/store';

// Create the Request base headers and URL.
const http = axios.create({
    baseURL: 'http://api.executiveclasses.local/api',
    headers: {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Format the request log.
const logRequest = config => {
    if (process.env.NODE_ENV == 'development') {
        let label = `API Request: ${config.url}: ${config.method.toUpperCase()}`;
        console.groupCollapsed(label);

        console.groupCollapsed('Headers');
        console.table(config.headers);
        console.groupEnd('Headers');

        console.group('Data');
        console.table(config.data);
        console.groupEnd('Data');

        console.log(config);

        console.groupEnd(label);
    }
};

// Formart the response log.
const logResponse = (response, data) => {
    if (process.env.NODE_ENV == 'development') {
        let label = `API Response: ${response.config.url}: ${response.status} (${response.statusText})`;

        console.groupCollapsed(label);

        console.log('Status:', data.status);

        console.group('Data');
        console.table(data.data);
        console.groupEnd('Data');

        Object.entries(data).forEach(([key, value]) => {
            if (!['status', 'data', 'original'].includes(key)) {
                console.groupCollapsed(key);
                console.table(value);
                console.groupEnd(key);
            }
        });

        console.log(data);

        console.groupEnd(label);
    }
};

// Interceptors for the request
http.interceptors.request.use(function (config) {
    // Add the token to the request.
    const token = store.getters.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    // Log the request.
    if (process.env.NODE_ENV == 'development') {
        logRequest(config);
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

    // Log the response.
    if (process.env.NODE_ENV == 'development') {
        logResponse(response, data);
    }

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