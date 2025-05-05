"use strict"

const parseLessons = (lessons, currentDay) => {

    const scheduleDayArray = []

    if (lessons == ["Загрузка"]) {
        scheduleDayArray.push["Загрузка"]
    }

    if (lessons) {
        let day_index = currentDay
        day_index = day_index[0]
        const pairs = lessons[day_index].pairs
        for (let i =0; i < pairs.length; i++){
            if (!pairs[i].schedulePairs[0]) {
                continue
            } else {
                scheduleDayArray.push(
                    {
                        info: pairs[i].schedulePairs[0].subject, 
                        place: pairs[i].schedulePairs[0].aud,  
                        date: pairs[i].time,
                        id: i
                    }
                )
            }
        }

    }


    return scheduleDayArray
}

export default parseLessons