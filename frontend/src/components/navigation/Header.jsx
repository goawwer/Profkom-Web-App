import React from 'react';
import Nav from './Nav';
import Logo from "../../assets/svgs/logo_profkom.svg?react";
import s from './Header.module.scss'

const Header = () => {
    return (
        <header className={s.header}>
            <Logo className={s.header__logo}/>
            <Nav />
        </header>
    );
};


export default Header;