import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotAuthPage = () => {

    const navigate = useNavigate()
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", marginTop: "80%"}}>
                <h1 style={{color: "var(--blue-color)"}}>АВТОРИЗИРУЙТЕСЬ !</h1>
                <button onClick={() => navigate("/auth/login")}style={{backgroundColor: "var(--blue-color)", color: "white"}}>ВОЙТИ</button>
        </div> 
    );
};


export default NotAuthPage;