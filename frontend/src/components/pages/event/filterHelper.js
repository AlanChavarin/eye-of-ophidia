export const filter = (match, i, event) => {
    if(match.top8){
        return false
    }
    if(i < 1){
        if(match.swissRound <= event.dayRoundArr[i]){
            return true
        } else return false
    } else {
        if(match.swissRound > event.dayRoundArr[i-1] && match.swissRound <= event.dayRoundArr[i]){
            return true
        } else return false
    }
}