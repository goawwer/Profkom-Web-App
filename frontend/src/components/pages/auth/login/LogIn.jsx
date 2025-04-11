import React from 'react';
import s from './LogIn.module.scss'
import Logo from'../../../../assets/svgs/logo_profkom.svg?react'
import LogoDecoration from'../../../../assets/svgs/logo_profkom_decorate.svg?react'
import LogInForm from './LogInForm';


const LogIn = () => {
    return (
        <>
            <main className={s.login}>
                <Logo />
                <div className={s.login__formPlace}>
                    <LogInForm/>
                </div>

            </main>
            <LogoDecoration className={s.login__decorationLogo}/>
        </>    
    );
};


export default LogIn;