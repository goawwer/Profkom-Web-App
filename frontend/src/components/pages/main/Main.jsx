import React from 'react';
import s from './Main.module.scss'
import DailyPanel from './sub-components/DailyPanel/DailyPanel';

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