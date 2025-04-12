import { useState} from 'react';
import axios from 'axios';
import qs from 'qs'


const baseAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/diary',
});

const baseHandlePost = async ({data, url}) => {
    console.log(data)

    const formBody = qs.stringify(data);
    console.log(formBody)

    try {
        const response = await baseAxios.post(
            url,
            formBody, // превращает объект в строку "username=...&password=..."
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
        });
        console.log(response.status + " СЮДА")
        console.log(response.data + " СЮДА")
        return response.data;
    } catch (err) {
        if (err.response) {
            // Сервер ответил с ошибкой
            console.log("Ошибка ответа сервера:", err.response.data);
            console.log("Статус:", err.response.status);
        } else if (err.request) {
            // Запрос был сделан, но ответа не пришло
            console.log("Нет ответа от сервера", err.request);
        } else {
            // Другая ошибка
            console.log("Ошибка при настройке запроса", err.message);
        }
    }
};

export default baseHandlePost;