import { useState, useEffect } from 'react';
import axios from 'axios';
import baseAxios from './baseAxios';

const useBaseGet = ({ url, deps=[] }) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      try {
        const response = await baseAxios.get( url, { signal });
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

      fetchData();

    return () => {
      controller.abort();
    };
  }, [ url, ...deps]);

  return [data, isLoading, error];
};

export default useBaseGet;