"use strict"

import axios from "axios"
import baseHandlePost from "../../../../hooks/axios/POST/baseHandlePost"
import qs from 'qs'

const handleLogin = async (data) => {
    data = qs.stringify(data);

    const [returnData, error] = await baseHandlePost({data: data, url: '/auth/login', headers: 'application/x-www-form-urlencoded'})

    let isToken = false;

    if (returnData.access_token) {
        console.log(returnData.access_token)
        localStorage.setItem("profkomUserToken", returnData.access_token)
        isToken = true   
    }
    

    return [returnData, error, isToken]
}

export default handleLogin