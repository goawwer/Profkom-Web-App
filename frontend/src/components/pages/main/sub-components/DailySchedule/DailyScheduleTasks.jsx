import React from 'react';
import DailyScheduleTemplate from './DailyScheduleTemplate';

const array = [
    {info: "купить шоколадку", date: "12:10 - 13:40", place: "пятерочка"},
    {info: "подстричься", date: "12:10 - 13:40"},
]

const DailyScheduleTasks = ({info, title}) => {
    return (
        <DailyScheduleTemplate info={array} bgColor='var(--purple-color)' title="планы на день"/>
    );
};


export default DailyScheduleTasks;