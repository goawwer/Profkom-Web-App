import React from 'react';
import DailyScheduleTemplate from './DailyScheduleTemplate';

const array = [
    {info: "физкультура", date: "12:10 - 13:40", place: "461 каб."},
    {info: "физкультура", date: "12:10 - 13:40", place: "461 каб."},
    {info: "физкультура", date: "12:10 - 13:40", place: "461 каб."},
    {info: "физкультура", date: "12:10 - 13:40", place: "461 каб."},
    {info: "физкультура", date: "12:10 - 13:40", place: "461 каб."},
]

const DailyScheduleLessons = ({info, title}) => {
    return (
        <DailyScheduleTemplate info={array} color='var(--blue-color)'/>
    );
};


export default DailyScheduleLessons;