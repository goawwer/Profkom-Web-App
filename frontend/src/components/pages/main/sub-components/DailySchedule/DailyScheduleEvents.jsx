import React, { useState } from 'react';
import DailyScheduleTemplate from './DailyScheduleTemplate';
import useBaseGet from '../../../../../hooks/axios/GET/useBaseGet'
import parseEvents from '../../actions/parseEvents';
import { ModalsTemplate } from "../../../../service-components/Modals/ModalsTemplate"
import EventOpened from '../EventOpened/EventOpened';

const DailyScheduleEvents = ({info, title, visibleDay}) => {
    const [events, isLoading, error] = useBaseGet({url: '/events/all', deps: [visibleDay]})
    const [openedId, setOpenedId] = useState(null)

    const openById = (title, description) => {
        setOpenedId({
            title: title,
            description: description
        })
        console.log('эщкере', title)
    }

    let parsedEvents = []

    console.log(visibleDay)
    if (events) {
        parsedEvents = parseEvents([...events], visibleDay)
            
    }

    if (!events) {
        return (
            <p style={{textAlign: "center", color: 'var(--orange-color)', fontSize: "var(--less-font-size)", opacity: 1}}>загрузка мероприятий...</p>
        )
    }
    if (parsedEvents.length) {
        return (
            <>
                <DailyScheduleTemplate info={parsedEvents} bgColor='var(--orange-color)' openById={openById} title="мероприятия"/>
                {openedId && 
                    <ModalsTemplate 
                        setIsOpened={setOpenedId}
                    >
                        {({handleCloseModal}) => (
                            < EventOpened 
                                title={openedId.title} 
                                description={openedId.description}
                                handleCloseModal={handleCloseModal}
                            />
                        )}
                    </ModalsTemplate>
                }
            </>
        )
    } 
};


export default DailyScheduleEvents;