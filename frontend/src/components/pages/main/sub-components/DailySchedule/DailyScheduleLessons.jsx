import React from 'react';
import DailyScheduleTemplate from './DailyScheduleTemplate';
import getLesson from "../../actions/getLessons"
import parseLessons from '../../actions/parseLessons';


const DailyScheduleLessons = ({group, week_offset, currentDay, dayOffset, title}) => {

    const [lessons, isLoading_lesson, error_lesson] = getLesson(group, week_offset, currentDay)
    console.log("lessons = "+ lessons)
    const scheduleDayArray = parseLessons(lessons, currentDay)


    if (!lessons) {
        return (
            <b style={{textAlign: "center", fontSize: "var(--large-font-size)", opacity: 0.25}}>Загрузка занятий!</b>
        )
    }
    if (scheduleDayArray.length) {
        return (
            <DailyScheduleTemplate info={scheduleDayArray} bgColor='var(--blue-color)' dayOffset={dayOffset} needsActualiityCheck={true}/>
        )

    } else {
        return (
            <b style={{textAlign: "center", fontSize: "var(--large-font-size)", opacity: 0.25}}>Нет занятий!</b>
        )
    }
};


export default DailyScheduleLessons;