import React from 'react';
import s from './Registration.module.scss'
import Logo from'../../../../assets/svgs/logo_profkom.svg?react'
import LogoDecoration from'../../../../assets/svgs/logo_profkom_decorate.svg?react'
import RegistrationForm from './RegistrationForm';


const Registration = () => {
    return (
        <>
            <main className={s.registration}>
                <Logo />
                <div className={s.registration__formPlace}>
                    <RegistrationForm/>
                </div>

            </main>
            <LogoDecoration className={s.registration__decorationLogo}/>
        </>    
    );
};


export default Registration;