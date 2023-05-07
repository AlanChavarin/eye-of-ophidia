export const getTimeDifference = (stringDate1, stringDate2) => {
    if(!stringDate1 || !stringDate2){
        return -1
    }
    const date1 = new Date(stringDate1)
    const date2 = new Date(stringDate2)
    const diffTime = date2 - date1
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}


