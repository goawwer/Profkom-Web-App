import React from "react"; 
import Header from "../navigation/Header";
import { Outlet } from "react-router-dom";


const RootLayout = () => {

    return(
        <div style = {{width: "100vw", position: "relative", overflow: "hidden", height:"100vh", backgroundColor:"white"}}>
            <Outlet />
        </div>
    )
}

export default RootLayout