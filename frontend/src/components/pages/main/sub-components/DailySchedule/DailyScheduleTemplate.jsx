import React from 'react';
import s from './DailyScheduleTemplate.module.scss'
import DailyTask from '../DailyTask/DailyTask';
import checkActuality from '../../actions/checkActuality';

const DailyScheduleTemplate = ({info, title, bgColor, dayOffset, needsActualiityCheck, openById}) => {

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
                        return <DailyTask info={elem} bgColor={bgColor} key={elem.id} openById={openById}/>
                    } else {
                        return <DailyTask info={elem} color={'var(--black-color)'} bgColor='transparent' key={elem.id} openById={openById}/>
                    }

                })
                :
                info.map((elem) => {
                    return <DailyTask info={elem} bgColor={bgColor} key={elem.id} openById={openById}/>
                 })
            }

        </div>
    );
};


export default DailyScheduleTemplate;