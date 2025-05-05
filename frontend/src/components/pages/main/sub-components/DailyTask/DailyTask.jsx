import React, { useState } from 'react';
import s from './DailyTask.module.scss'

const DailyTask = ({info, bgColor, color="white", openById=(() => {return})}) => {
    

    return (
        <div className={s.dailyTask}>
            <div className={s.dailyTask__subInfo}>
                <p>{info?.date}</p>
                <p>{info?.place}</p>
            </div>

            <button className={s.dailyTask__button} style={{backgroundColor: `${bgColor}`, color: `${color}`}} onClick={() => openById(info?.info, info?.description)}>
                {info?.info}
            </button>
        </div>
    );
};


export default DailyTask;