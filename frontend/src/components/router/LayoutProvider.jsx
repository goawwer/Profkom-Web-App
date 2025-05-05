import React from "react";

import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import Main from '../pages/main/Main'
import Schedule from '../pages/schedule/Schedule'
import Profile from '../pages/profile/Profile'
import Notes from '../pages/notes/Notes'
import Auth from '../pages/auth/Auth'
import LogInForm from "../pages/auth/LogInForm";
import RegistrationForm from "../pages/auth/RegistrationForm";
import UnauthLayout from "./UnauthLayout";
import ChatPage from "../pages/chatpage/ChatPage"

export default function LayoutProvider () {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element = {<Outlet/>}>

                <Route path='/' element={<RootLayout />}>

                    <Route index element={<Main />} />

                    <Route path='/schedule' element={<Schedule />} />

                    <Route path='/notes' element={<Notes />} />

                    <Route path='/profile' element={<Profile />} />

                    <Route path ='/sapsan' element={<ChatPage />} />

                </Route>

                <Route element={<UnauthLayout />}>

                    <Route element={<Auth />} >
                        <Route path='/auth/login' element={<LogInForm />} />
                        <Route path='/auth/registration' element={<RegistrationForm />} />

                    </Route>

                </Route>

            </Route>
        )
    )
    return (
        <>
            <RouterProvider router={(router)} />            
        </>   
    )}