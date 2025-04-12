import React from "react";

import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import Main from '../pages/main/Main'
import Schedule from '../pages/schedule/Schedule'
import Profile from '../pages/profile/Profile'
import Notes from '../pages/notes/Notes'
import LogIn from "../pages/auth/login/LogIn";
import Registration from "../pages/auth/registration/Registration";
import UnauthLayout from "./UnauthLayout";

export default function LayoutProvider () {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element = {<Outlet/>}>

                <Route path='/' element={<RootLayout />}>

                    <Route index element={<Main />} />

                    <Route path='/schedule' element={<Schedule />} />

                    <Route path='/notes' element={<Notes />} />

                    <Route path='/profile' element={<Profile />} />

                </Route>

                <Route element={<UnauthLayout />}>

                    <Route path='/auth/registration' element={<Registration />} />
                    <Route path='/auth/login' element={<LogIn />} />

                </Route>

            </Route>
        )
    )
    return (
        <>
            <RouterProvider router={(router)} />            
        </>   
    )}