import React from 'react';
import DailyScheduleTemplate from './DailyScheduleTemplate';

const array = [
    {info: "невероятныое мероприятие", date: "12:10 - 13:40", place: "261 каб."},
]

const DailyScheduleTasks = ({info, title}) => {
    return (
        <DailyScheduleTemplate info={array} color='var(--orange-color)' title="меропритяия"/>
    );
};


export default DailyScheduleTasks;