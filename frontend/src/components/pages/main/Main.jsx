import React, { useContext, useEffect } from 'react';
import s from './Main.module.scss'
import DailyPanel from './sub-components/DailyPanel/DailyPanel';
import useBaseGet from '../../../hooks/axios/GET/useBaseGet';
import { UserContext } from '../../context/UserContext';

const Main = () => {

    return (
        <main className={s.main}>
            <section className={s.main__dailyScheduleSection}>
                <DailyPanel />
            </section>
        </main>
    );
};


export default Main;