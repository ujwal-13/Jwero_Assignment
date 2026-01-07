import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/analytics',
    timeout: 10000, // 10 second timeout
});

// Add request interceptor for logging
API.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === 'ECONNREFUSED') {
            console.error('Connection refused - Is the backend server running on port 4000?');
            error.message = 'Cannot connect to backend server. Please ensure it is running on port 4000.';
        } else if (error.response) {
            console.error('API Error Response:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('API Error - No response received:', error.request);
            error.message = 'No response from server. Please check if the backend is running.';
        }
        return Promise.reject(error);
    }
);

export const fetchRevenue = (startDate, endDate) => 
    API.get(`/revenue?startDate=${startDate}&endDate=${endDate}`);

export const fetchDailySales = (startDate, endDate) => 
    API.get(`/daily-sales?startDate=${startDate}&endDate=${endDate}`);

export const fetchCategories = () => 
    API.get('/category');

export const fetchTopProducts = (startDate, endDate) => 
    API.get(`/top-products?startDate=${startDate}&endDate=${endDate}`);