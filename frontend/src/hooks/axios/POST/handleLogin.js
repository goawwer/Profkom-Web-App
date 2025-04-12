import axios from "axios"
import baseHandlePost from "./baseHandlePost"
import qs from 'qs'

const handleLogin = async (data) => {
    data = qs.stringify(data);

    const [returnData, error] = await baseHandlePost({data: data, url: '/auth/login', headers: 'application/x-www-form-urlencoded'})

    let isToken = false;

    if (returnData) {
        console.log(returnData.access_token)
        localStorage.setItem("profkomUserToken", returnData.access_token)
        isToken = true   
    }
    

    return [returnData, error, isToken]
}

export default handleLogin