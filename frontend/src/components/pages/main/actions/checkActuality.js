"use strict"
import getDateInfo from "./getDateInfo" 

const checkActuality = (array, dayOffset) => {
    let actualDate = getDateInfo(0).fullDateToday
    let thisDate = getDateInfo(dayOffset).formattedDate 

    for (let i=0; i<array.length; i++) {
        let time = (array[i].date).split("-")
        
        time.forEach((element, index) => {
            if (element.length<5) {
                element = '0'+ element
            }
            time[index] = element
        });
        time = time[0] + "-" + time[1]


        let itemDate = `${thisDate.slice(6)}-${thisDate.slice(3,5)}-${thisDate.slice(0,2)}T`+(time).slice(6)

        itemDate = new Date(itemDate)
        actualDate = new Date(actualDate)

        if (actualDate<itemDate) {
            array[i].isActual = true
        }
        else {
            array[i].isActual = false
        }
    }

    return array

}

export default checkActuality