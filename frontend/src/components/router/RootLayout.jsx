import React from "react"; 
import Header from "../navigation/Header";
import { Outlet } from "react-router-dom";
import getFromLocalStorage from "../../hooks/getFromLocalStorage";
import NotAuthPage from "../pages/auth/not-auth-page/NotAuthPage";

const RootLayout = () => {

    try {
        const gfls = getFromLocalStorage();
        return(
            <div style={{width: "90%", paddingBottom: "2rem"}}>
                <Header />
                <Outlet />
            </div>)

    } catch (error) {
        return (
            <NotAuthPage />
        )
    }
    

}

export default RootLayout