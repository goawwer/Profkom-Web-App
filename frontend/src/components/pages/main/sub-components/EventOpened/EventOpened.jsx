import React, { useState } from 'react';
import s from './EventOpened.module.scss'

const EventOpened = ({title, description}) => {
    return (
        <div className={s.eventOpened}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
};


export default EventOpened;