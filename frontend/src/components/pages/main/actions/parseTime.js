"use strict"

const parseTime = (date) => {

    const day = `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(0,4)}` 
    const time = `${date.slice(11,13)}:${date.slice(14,16)}`
    return {day, time}
}

export default parseTime