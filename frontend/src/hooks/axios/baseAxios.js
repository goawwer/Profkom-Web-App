"use strict"

import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/diary',
});

baseAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('profkomUserToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Ошибка запроса:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default baseAxios;