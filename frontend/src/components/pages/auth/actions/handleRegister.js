"use strict"

import baseHandlePost from "../../../../hooks/axios/POST/baseHandlePost"

const handleRegister = async (data) => {

    data = {...data, 
        ...{
            is_active: true, 
            is_superuser: false, 
            is_verified: false
        }
    }

    const [returnData, error] = await baseHandlePost({data: data, url: '/auth/register', headers: 'application/json'})

    let isRegister = false;

    if (returnData) {
        console.log(returnData)
        isRegister = true   
    }
    

    return [returnData, error, isRegister]
}

export default handleRegister