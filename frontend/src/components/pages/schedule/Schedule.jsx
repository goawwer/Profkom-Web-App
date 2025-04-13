import React from 'react';
import s from './Schedule.module.scss'
import AccordionTemplate from './sub-components/AccordionTemplate';

const Schedule = () => {
    return (
        <main className={s.schedule}>
            <ul className={s.schedule__container}>
                <li><AccordionTemplate title="ГРАФИК"/></li>
                <li><AccordionTemplate title="МЕРОПРИЯТИЯ"/></li>
                <li><AccordionTemplate title="КОМИССИИ ПРОФКОМА"/></li>
            </ul>
        </main>
    );
};


export default Schedule;