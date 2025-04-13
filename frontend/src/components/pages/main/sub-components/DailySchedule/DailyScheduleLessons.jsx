import React from 'react';
import DailyScheduleTemplate from './DailyScheduleTemplate';
import useBaseGet from '../../../../../hooks/axios/GET/useBaseGet';


const DailyScheduleLessons = ({info, title}) => {

    if (info.length) {
        return (
            <DailyScheduleTemplate info={info} color='var(--blue-color)'/>
        )

    } else {
        return (
            <b style={{textAlign: "center", fontSize: "var(--large-font-size)", opacity: 0.25}}>Нет занятий!</b>
        )
    }
};


export default DailyScheduleLessons;