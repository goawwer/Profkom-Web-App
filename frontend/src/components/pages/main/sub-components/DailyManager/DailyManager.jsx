import React, { useState } from 'react';
import s from '../DailyPanel/DailyPanel.module.scss'
import getDateInfo from '../../actions/getDateInfo';

const DailyManager = ({dayOffset, setDayOffset, weekOffset, setWeekOffset, currentDay, visibleDay, setVisibleDay}) => {

    const date = visibleDay.slice(0,5)


    const nextDay = () => {
        const prevDayIndex = getDateInfo(dayOffset).currentDay[0];
        const newOffset = dayOffset + 1;
        const nextDayIndex = getDateInfo(newOffset).currentDay[0];
    
        // переход с вс (6) на пн (0) => новая неделя
        if (prevDayIndex === 6 && nextDayIndex === 0) {
            setWeekOffset(weekOffset + 1);
        }
    
        setDayOffset(newOffset);
        setVisibleDay(getDateInfo(newOffset).formattedDate);
    };
    
    const previousDay = () => {
        const prevDayIndex = getDateInfo(dayOffset).currentDay[0];
        const newOffset = dayOffset - 1;
        const nextDayIndex = getDateInfo(newOffset).currentDay[0];
    
        if (prevDayIndex === 0 && nextDayIndex === 6) {
            console.log("ДОЛЖЕН ИЗМЕНИТЬСЯ weekOffset "+ prevDayIndex)
            setWeekOffset(weekOffset - 1);
            console.log("Изменился?"+ weekOffset)
        }
    
        setDayOffset(newOffset);
        setVisibleDay(getDateInfo(newOffset).formattedDate);
    };

    return (
        <div className={s.dailyPanel__header}>
            <button onClick={() =>previousDay()}>{"<"}</button>
            <h1 className={s.dailyPanel__day}>
                {currentDay?.[1]}, <br/>
                {date}
            </h1>
            <button onClick={() => nextDay()}>{">"}</button>
        </div>

    )
}

export default DailyManager