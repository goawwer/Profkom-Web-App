import React from "react";

import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import AuthedLayout from './AuthedLayout';
import UnauthedLayout from "./UnauthedLayout";
import Main from '../pages/main/Main'
import Profile from '../pages/profile/Profile'
import Notes from '../pages/notes/Notes'
import Auth from '../pages/auth/Auth'
import LogInForm from "../pages/auth/LogInForm";
import RegistrationForm from "../pages/auth/RegistrationForm";
import ChatPage from "../pages/chatpage/ChatPage"

export default function LayoutProvider () {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element = {<Outlet/>}>

                <Route path='/' element={<AuthedLayout />}>

                    <Route index element={<Main />} />

                    <Route path='/notes' element={<Notes />} />

                    <Route path='/profile' element={<Profile />} />

                    <Route path ='/sapsan' element={<ChatPage />} />

                </Route>

                <Route element={<UnauthedLayout />}>

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