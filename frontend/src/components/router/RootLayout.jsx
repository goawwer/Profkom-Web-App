import React from "react"; 
import Header from "../navigation/Header";
import { Outlet } from "react-router-dom";
import withAuth from "../HOC's/withAuth";

const RootLayout = () => {
    const Layout = withAuth (Header, Outlet);

    return(
        <Layout />
    )
}

export default RootLayout