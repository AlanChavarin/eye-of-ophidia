export const INITIAL_STATE = {
    event: null,
    matches: null,
    backgroundImage: '',
    tab: 'matches',
    lastRound: ''
}

export const eventReducer = (state, action) => {
    switch(action.type){
        case('SET_EVENT') : 
            return {
                ...state,
                event: action.payload
            }
        case('SET_MATCHES') : 
            return {
                ...state,
                matches: action.payload
            }
        case('SET_BACKGROUNDIMAGE') : 
            return {
                ...state,
                backgroundImage: action.payload
            }
        case('SET_BACKGROUNDPOSITION') : 
            return {
                ...state,
                event: {
                    ...state.event,
                    backgroundPosition: action.payload,
                }
            }
        case('SET_TAB') : 
            return {
                ...state,
                tab: action.payload
            }
        case('SET_LASTROUND') : 
            return {
                ...state,
                lastRound: action.payload
            }
        case('SET_MATCHES_AND_LASTROUND') : {
            let match = action.payload[action.payload.length-1]
            let round
            let top8
            if(!round?.top8){
                top8 = false
                round = match?.swissRound
            } else {
                top8 = true
                round = match?.top8Round
            }
            return{
                ...state,
                matches: action.payload,
                lastRound: {
                    top8: top8,
                    round: round,
                    format: match?.format,
                    twitch: match?.twitch,

                }
            }
        }
        default:
            return state
    }
}