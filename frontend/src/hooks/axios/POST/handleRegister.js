import axios from "axios"
import baseHandlePost from "./baseHandlePost"

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

    let responseStatus = ""

    if (returnData) {
        console.log(returnData)
        isRegister = true   
    }
    

    return [returnData, error, isRegister]
}

export default handleRegister