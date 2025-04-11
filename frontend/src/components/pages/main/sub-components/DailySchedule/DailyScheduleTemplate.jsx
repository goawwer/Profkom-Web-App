import React from 'react';
import s from './DailyScheduleTemplate.module.scss'
import DailyTask from '../DailyTask/DailyTask';

const DailyScheduleTemplate = ({info, title, color}) => {
    return (
        <div className={s.dailySchedule}>
            {title && 
                <p style={{color: `${color}`}}>
                    {title}
                </p>
            }

            {info.map((elem) => {
               return <DailyTask info={elem} color={color}/>
            })}
        </div>
    );
};


export default DailyScheduleTemplate;