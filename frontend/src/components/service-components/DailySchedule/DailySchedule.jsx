import React from 'react';
import s from './DailySchedule.module.scss'

const DailySchedule = () => {
    return (
        <div className={s.dailySchedule}>
            <div className={s.dailySchedule__header}>

            </div>

            <div className={s.dailySchedule__container}>
                <div className={s.DailySchedule__lessonsContainer}>

                </div>

                <div className={s.dailySchedule__tasksContainer}>

                </div>
            </div>

        </div>
    );
};


export default DailySchedule;