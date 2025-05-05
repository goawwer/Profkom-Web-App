"use strict"

import parseTime from "./parseTime";

const parseEvents = (events, visibleDay) => {
    const parsedEvents = []

    events.forEach(element => {
        if (element) {
            const start_time = parseTime(element?.start_time)

            if (start_time.day === visibleDay) {
                parsedEvents.push({
                    info: element?.title, 
                    date: start_time.time, 
                    place: element?.location, 
                    id: element?.id,
                    description: element?.description
                })
            }
        }

    });

    return parsedEvents
}

export default parseEvents