import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/analytics'
});

export const fetchRevenue = (startDate, endDate) => 
    API.get(`/revenue?startDate=${startDate}&endDate=${endDate}`);

export const fetchDailySales = (startDate, endDate) => 
    API.get(`/daily-sales?startDate=${startDate}&endDate=${endDate}`);

export const fetchCategories = () => 
    API.get('/category');

export const fetchTopProducts = (startDate, endDate) => 
    API.get(`/top-products?startDate=${startDate}&endDate=${endDate}`);