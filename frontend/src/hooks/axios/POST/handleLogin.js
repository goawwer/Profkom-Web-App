import baseHandlePost from "./baseHandlePost"

const handleLogin = (data) => {
    const response = baseHandlePost({data: data, url: '/auth/login'})

    return response
}

export default handleLogin