import React from 'react';
import s from './Main.module.scss'
import DailyPanel from './sub-components/DailyPanel/DailyPanel';
import useBaseGet from '../../../hooks/axios/GET/useBaseGet';
const Main = () => {
    const [response, isLoading, error] = useBaseGet({method: 'GET', url: '/events/all'})
    console.log(response)

    return (
        <main className={s.main}>
            <section className={s.main__dailyScheduleSection}>
                <DailyPanel />
            </section>
        </main>
    );
};


export default Main;