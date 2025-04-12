import { useState} from 'react';
import axios from 'axios';

const baseAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/diary',
});

const baseHandlePost = async ({data, url, headers}) => {
    console.log(data)

    let returnData = {}
    let error = {}
    try {
        const response = await baseAxios.post(
            url,
            data, // превращает объект в строку "username=...&password=..."
            {
                headers: {
                    'Content-Type': `${headers}`,
                }
        });
        console.log(response.status + " СЮДА")
        console.log(response.data)
        returnData = response.data;

    } catch (err) {
        if (err.response) {
            // Сервер ответил с ошибкой
            console.log("Ошибка ответа сервера:", err.response.data);
            console.log("Статус:", err.response.status);
            error = err.response.status
        } else if (err.request) {
            console.log("Нет ответа от сервера", err.request);
            error = err.request
        } else {
            // Другая ошибка
            error = err.message
            console.log("Ошибка при настройке запроса", err.message);
        }
        
    } finally {
        console.log([returnData, error])
        return [returnData, error]
    }

    
};

export default baseHandlePost;