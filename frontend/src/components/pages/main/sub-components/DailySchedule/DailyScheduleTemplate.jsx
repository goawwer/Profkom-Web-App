import React from 'react';
import s from './DailyScheduleTemplate.module.scss'
import DailyTask from '../DailyTask/DailyTask';
import checkActuality from '../../actions/checkActuality';

const DailyScheduleTemplate = ({info, title, bgColor, dayOffset, needsActualiityCheck, onClick}) => {

    if (needsActualiityCheck) {
        info = checkActuality(info, dayOffset)
    }

    return (
        <div className={s.dailySchedule}>
            {title && 
                <p style={{color: `${bgColor}`}}>
                    {title}
                </p>
            }
            
            {needsActualiityCheck ?
                info.map((elem) => {
                    if (elem.isActual) {
                        return <DailyTask info={elem} bgColor={bgColor} onClick={onClick}/>
                    } else {
                        return <DailyTask info={elem} color={'var(--black-color)'} onClick={onClick}/>
                    }

                })
                :
                info.map((elem) => {
                    return <DailyTask info={elem} bgColor={bgColor} onClick={onClick}/>
                 })
            }

        </div>
    );
};


export default DailyScheduleTemplate;