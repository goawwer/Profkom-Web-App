import React from 'react';
import s from './Auth.module.scss'
import Logo from'../../../assets/svgs/logo_profkom.svg?react'
import LogoDecoration from'../../../assets/svgs/logo_profkom_decorate.svg?react'
import { Outlet } from 'react-router-dom';

const Auth = () => {

    return (
        <>
            <main className={s.login}>
                <Logo />
                <div className={s.login__formPlace}>
                    <Outlet />
                </div>

            </main>
            <LogoDecoration className={s.login__decorationLogo}/>
        </>    
    );
};


export default Auth;