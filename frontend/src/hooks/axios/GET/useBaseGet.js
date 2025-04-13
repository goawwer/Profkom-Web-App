import { useState, useEffect } from 'react';
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

const useBaseGet = ({ method = 'GET', url }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await baseAxios.request({ method, url, signal });
        setData(response.data);
        console.log('Успешный ответ:', response.data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error);
          console.error('Ошибка в useBaseGet:', error.response?.status, error.response?.data);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!data) {
      fetchData();
    }

    return () => {
      controller.abort();
    };
  }, [method, url]);

  return [data, isLoading, error];
};

export default useBaseGet;