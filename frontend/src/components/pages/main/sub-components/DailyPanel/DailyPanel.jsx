import React, { useState } from 'react';
import s from './DailyPanel.module.scss'
import DailyScheduleLessons from '../DailySchedule/DailyScheduleLessons';
import DailyScheduleTasks from '../DailySchedule/DailyScheduleTasks';
import DailyScheduleEvents from '../DailySchedule/DailyScheduleEvents';
import useBaseGet from '../../../../../hooks/axios/GET/useBaseGet';
import getDateData from '../../../../../hooks/dayFinder';


const DailyPanel = () => {

    const [dayOffset, setDayOffset] = useState(0)

    const dayInfo = getDateData(dayOffset)

    const day = dayInfo[0]
    console.log("ДЕНЬ "+ day)
    const weekDays = dayInfo[1]

    const [week_offset, setWeek_offset] = useState(0)

    const [visible_week, setVisible_Week] = useState(0)
    const [visible_day, setVisible_day] = useState(dayInfo[2])

    const [user, isLoading, error] = useBaseGet({method: 'GET', url: '/users/me'})

    const [lessons, isLoading_lesson, error_lesson] = useBaseGet({method: 'GET', url: `/groups/${user?.group_id}/schedule/?week_offset=${week_offset}`, deps: [week_offset]})
    console.log(lessons)

    const nextDay = () => {
        const prevDayIndex = getDateData(dayOffset)[0][0];
        const newOffset = dayOffset + 1;
        const nextDayIndex = getDateData(newOffset)[0][0];
    
        // переход с вс (6) на пн (0) => новая неделя
        if (prevDayIndex === 6 && nextDayIndex === 0) {
            setWeek_offset(week_offset + 1);
        }
    
        setDayOffset(newOffset);
        setVisible_day(getDateData(newOffset)[2]);
    };
    
    const previousDay = () => {
        const prevDayIndex = getDateData(dayOffset)[0][0];
        const newOffset = dayOffset - 1;
        const nextDayIndex = getDateData(newOffset)[0][0];
    
        // переход с пн (0) на вс (6) => предыдущая неделя
        if (prevDayIndex === 0 && nextDayIndex === 6) {
            console.log("ДОЛЖЕН ИЗМЕНИТЬСЯ weekOffset "+ prevDayIndex)
            setWeek_offset(week_offset - 1);
            console.log("Изменился?"+ week_offset)
        }
    
        setDayOffset(newOffset);
        setVisible_day(getDateData(newOffset)[2]);
    };

    const scheduleDayArray = []

    console.log("ДЕНЬ ДЕНЬ ДЕНЬ: "+ dayInfo[0])

    if (lessons) {
        let day_index = dayInfo[0]
        console.log("НЕЕЕЕ ЩИИИЩЬ "); console.log(day_index) 
        day_index = day_index[0]
        const pairs = lessons[day_index].pairs
        console.log(pairs)
        for (let i =0; i < pairs.length; i++){
            if (!pairs[i].schedulePairs[0]) {
                continue
            } else {
                console.log("ЗДЕСЬ")
                scheduleDayArray.push(
                    {
                        info: pairs[i].schedulePairs[0].subject, 
                        place: pairs[i].schedulePairs[0].aud,  
                        date: pairs[i].time
                    }
                )
            }
        }
        console.log(scheduleDayArray)
    }


    
    return (
        <div className={s.dailyPanel}>
            <div className={s.dailyPanel__header}>
                <button onClick={() =>previousDay()}>{"<"}</button>
                <h1 className={s.dailyPanel__day}>
                    {day[1]}, <br/>
                    {visible_day}
                </h1>
                <button onClick={() => nextDay()}>{">"}</button>
            </div>

            <div className={s.dailyPanel__container}>
                <DailyScheduleLessons info={scheduleDayArray}/>
                <DailyScheduleTasks />
                <DailyScheduleEvents />
            </div>

        </div>
    );
};


export default DailyPanel;