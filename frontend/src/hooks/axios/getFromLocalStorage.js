const getFromLocalStorage = () => {
    const value = localStorage.getItem("profkomUserToken")
    if (!localStorage.getItem("profkomUserToken")) {
        throw new Error('ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗИРОВАН !')
    } else {
        return value
    }
}


export default getFromLocalStorage