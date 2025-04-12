import React from 'react';
import { useNavigate } from 'react-router-dom';


const withAuth = (Header, Outlet) => {
    return () => {
        if (true) {
            if (localStorage.getItem("profkomUserToken")) {
                console.log(localStorage.getItem("profkomUserToken"))
                return (
                    <div style={{width: "90%", paddingBottom: "2rem"}}>
                        <Header />
                        <Outlet />
                    </div>
                )
    
            } else {
                return (
                    <div style = {{width: "100vw", position: "relative", overflow: "hidden", height:"100vh", backgroundColor:"white"}}>
                        <Outlet />
                    </div>
                )    
            }
        } else {
            return (
                <div style={{width: "90%", paddingBottom: "2rem"}}>
                <Header />
                <Outlet />
            </div> 
            )
   
        }

    }
};


export default withAuth;