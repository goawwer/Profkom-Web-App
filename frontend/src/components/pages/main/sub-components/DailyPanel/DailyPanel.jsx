import React, { useState } from 'react';
import s from './DailyPanel.module.scss';
import DailyManager from '../DailyManager/DailyManager';
import DailyScheduleLessons from '../DailySchedule/DailyScheduleLessons';
import DailyScheduleTasks from '../DailySchedule/DailyScheduleTasks';
import DailyScheduleEvents from '../DailySchedule/DailyScheduleEvents';
import useBaseGet from '../../../../../hooks/axios/GET/useBaseGet';
import getDateInfo from '../../actions/getDateInfo';


const DailyPanel = () => {

    const [dayOffset, setDayOffset] = useState(0)
    const {currentDay, week, formattedDate} = getDateInfo(dayOffset)
    const [week_offset, setWeek_offset] = useState(0)
    const [visible_day, setVisible_day] = useState(formattedDate)
    
    const [user, isLoading, error] = useBaseGet({url: '/users/me'})

    
    return (
        <div className={s.dailyPanel}>
            <DailyManager 
                dayOffset={dayOffset} 
                setDayOffset={setDayOffset} 
                week_offset={week_offset} 
                setWeek_offset={setWeek_offset}
                currentDay={currentDay}
                visible_day={visible_day}
                setVisible_day={setVisible_day}/>

            <div className={s.dailyPanel__container}>
                <DailyScheduleLessons group={user?.group_id} week_offset={week_offset} currentDay={currentDay} dayOffset={dayOffset}/>
                <DailyScheduleTasks />
                <DailyScheduleEvents />
            </div>

        </div>
    );
};


export default DailyPanel;