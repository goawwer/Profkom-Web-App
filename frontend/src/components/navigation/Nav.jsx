import React from 'react';
import s from './Nav.module.scss'
import { NavLink } from 'react-router-dom';

const handleChangePage = ({isActive}) => isActive ? {fontWeight: 'var(--bold-font-weight)'} : {fontWeight: 'var(--normal-font-weight)', fontSize: 'var(--less-font-size'}

const Nav = () => {
    return (
        <nav className={s.nav}>
            <NavLink to='/' style={handleChangePage} className={s.nav__link}>главная</NavLink>
            <NavLink to='/schedule' style={handleChangePage} className={s.nav__link}>расписание</NavLink>
            <NavLink to='/notes' style={handleChangePage} className={s.nav__link}>заметки</NavLink>
            <NavLink to='/profile' style={handleChangePage} className={s.nav__link}>профиль</NavLink>
        </nav>
    );
};


export default Nav;