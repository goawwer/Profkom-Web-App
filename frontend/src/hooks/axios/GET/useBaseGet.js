import { useState, useEffect} from 'react';
import axios from 'axios';

const baseAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/diary',
});

const useBaseGet = ({method = "GET", url}) => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {

            try {
                const response = await baseAxios.request({method, url, signal})
                setData(response.data)
                console.log(response.data)
                
            } catch (error) {
                if (!axios.isCancel(error)){
                    setError(error)
                }

            } finally {
                setLoading(false)
            }
        }

        if (!data) {
            fetchData()
        }

        return () => {
            controller.abort()
        }

    }, [method, url])

    return [data, isLoading, error]
};

export default useBaseGet;
