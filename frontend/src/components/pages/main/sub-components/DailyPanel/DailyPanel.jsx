import React from 'react';
import s from './DailyPanel.module.scss'
import DailyScheduleLessons from '../DailySchedule/DailyScheduleLessons';
import DailyScheduleTasks from '../DailySchedule/DailyScheduleTasks';
import DailyScheduleEvents from '../DailySchedule/DailyScheduleEvents';

const todayDay = ["ПН", "09.04.2024"]

const DailyPanel = ({currentDay = todayDay}) => {
    let weekDay = currentDay[0]
    let day = currentDay[1].slice(0,5)
    
    return (
        <div className={s.dailyPanel}>
            <div className={s.dailyPanel__header}>
                <button>{"<"}</button>
                <h1 className={s.dailyPanel__day}>
                    {weekDay}, <br/>
                    {day}
                </h1>
                <button>{">"}</button>
            </div>

            <div className={s.dailyPanel__container}>
                <DailyScheduleLessons />
                <DailyScheduleTasks />
                <DailyScheduleEvents />
            </div>

        </div>
    );
};


export default DailyPanel;