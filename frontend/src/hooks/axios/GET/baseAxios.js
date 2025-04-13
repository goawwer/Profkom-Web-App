import axios from 'axios';

// Создаем экземпляр axios
const baseAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/diary',
});

// Добавляем интерцептор для автоматического добавления токена
baseAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('profkomUserToken'); // Исправляем ключ
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем заголовок Authorization
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор для обработки ошибок (добавим для диагностики)
baseAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Ошибка запроса:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default baseAxios;