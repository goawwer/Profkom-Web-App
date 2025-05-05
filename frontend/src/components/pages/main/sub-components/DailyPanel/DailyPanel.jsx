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
    const [weekOffset, setWeekOffset] = useState(0)
    const [visibleDay, setVisibleDay] = useState(formattedDate)
    
    const [user, isLoading, error] = useBaseGet({url: '/users/me'})

    
    return (
        <div className={s.dailyPanel}>
            <DailyManager 
                dayOffset={dayOffset} 
                setDayOffset={setDayOffset} 
                weekOffset={weekOffset} 
                setWeekOffset={setWeekOffset}
                currentDay={currentDay}
                visibleDay={visibleDay}
                setVisibleDay={setVisibleDay}/>

            <div className={s.dailyPanel__container}>
                <DailyScheduleLessons group={user?.group_id} weekOffset={weekOffset} currentDay={currentDay} dayOffset={dayOffset}/>
                <DailyScheduleEvents visibleDay={visibleDay}/>
            </div>

        </div>
    );
};


export default DailyPanel;