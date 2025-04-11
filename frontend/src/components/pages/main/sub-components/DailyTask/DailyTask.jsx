import React from 'react';
import s from './DailyTask.module.scss'

const DailyTask = ({info, color}) => {
    return (
        <div className={s.dailyTask}>
            <div className={s.dailyTask__subInfo}>
                <p>{info.date}</p>
                <p>{info.place}</p>
            </div>

            <button className={s.dailyTask__button} style={{backgroundColor: `${color}`}}>
                {info.info}
            </button>
        </div>
    );
};


export default DailyTask;