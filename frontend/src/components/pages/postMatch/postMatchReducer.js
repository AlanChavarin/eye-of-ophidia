import { getYoutubeParams } from '../../../helpers/YoutubeParams'
import { getTwitchParams } from '../../../helpers/TwitchParams'

export const INITIAL_STATE = {
    form: {
        player1name: '',
        player1hero: '',
        player1deck: '',

        player2name: '',
        player2hero: '',
        player2deck: '',

        top8: '',
        swissRound: null,
        top8Round: 'None',

        event: '',
        format: '',
        twitch: false,
        twitchTimeStamp: '',
        link: '',
        timeStamp: '', 
        fullLink: '',
        date: '',   
    },
    eventNames: [],
    eventData: {},
    selectedEventData: {},
    deletePopup: false,
    heroType: '',
    nameLinkPairs: {},
    dontUpdateLinks: false,
}

export const postMatchReducer = (state, action) => {
    switch(action.type){
        case('UPDATE_FORM') : 
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.target.name]: action.payload.target.value
                }
            }

        case('UPDATE_FORM_CHECKED') : 
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.target.name]: action.payload.target.checked
                }
            }
        
        case('SET_EVENTNAMES') : 
            return {
                ...state,
                eventNames: action.payload
            }
        
        case('SET_EVENTDATA') :
            return {
                ...state,
                eventData: action.payload
            }

        case('SET_SELECTEDEVENTDATA') : 
            return {
                ...state,
                selectedEventData: action.payload
            }
        
        case('SET_DELETEPOPUP') : 
            return {
                ...state,
                deletePopup: action.payload
            }

        case('SET_HEROTYPE') : 
            return {
                ...state,
                heroType: action.payload
            }

        case('SET_NAMELINKPAIRS') : 
            return {
                ...state,
                nameLinkPairs: action.payload
            }
        
        case('SET_DONTUPDATELINKS') : 
            return {
                ...state,
                dontUpdateLinks: action.payload
            }

        case('SET_FORM_EDITING_MATCH') : 
            return {
                ...state,
                form: {
                    ...action.payload,
                    event: action.payload.event.name,
                    top8: action.payload.top8 ? 'true' : 'false',
                    date: action.payload.date ? action.payload.date.substring(0, 10) : '',
                    format: ''
                }
            }

        case('SET_EVENTDATA_AND_EVENTNAMES') : {
                let tempEventNamesArr = []
                action.payload.events?.map(event => tempEventNamesArr.push(event.name))
                return {
                    ...state,
                    eventData: action.payload.events,
                    eventNames: tempEventNamesArr,
                }
            }
        
        case('SET_LINK_AND_TIMESTAMP') : {
            let params
            if(!state.form.twitch){
                params = getYoutubeParams(action.payload)
                if(params){
                    return{
                        ...state,
                        form: {
                            ...state.form,
                            link: params[0],
                            timeStamp: params[1]
                        }
                    }
                }
            } else {
                params = getTwitchParams(action.payload)
                if(params){
                    return{
                        ...state,
                        form: {
                            ...state.form,
                            link: params[0],
                            twitchTimeStamp: params[1]
                        }
                    }
                }
            }

            return state
        }

        case('SET_FORMAT_BASED_ON_EVENT_AND_SET_SELECTEDEVENTDATA') : {
            let newState
            state.eventData.map && state.eventData?.map(thisEvent => {
                if(state.form.event === thisEvent.name && thisEvent.format !=='Mixed'){
                    newState = {
                        ...state,
                        form: {
                            ...state.form,
                            format: thisEvent.format
                        } 
                    }
                }

                if(state.form.event === thisEvent.name){
                    // newState = {
                    //     ...newState,
                    //     selectedEventData: thisEvent
                    // }
                    newState = {
                        ...state,
                        form: {
                            ...state.form,
                        } 
                    }
                }
            })
            
            if(newState){
                return newState
            } else {
                return state
            }
        }

        case('SET_FORM') : 
            return{
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            }

        case('SET_HEROTYPE_BASED_ON_FORMAT') : {
            const {format} = state.form
            let heroType

            if(format==='Classic Constructed'){
                heroType = 'adult'
            }
            else if(format==='Blitz' || format==='Draft' || format==='Sealed'){
                heroType = 'young'
            }
            else if(format===''){heroType = ''}

            return {
                ...state,
                heroType: heroType
            } 
        }

        case('SET_PLAYER1DECK_BASED_ON_PLAYER1NAME') : {
            const {nameLinkPairs} = state
            const {player1name} = state.form
            if(nameLinkPairs[player1name]){
                return{
                    ...state,
                    form: {
                        ...state.form,
                        player1deck: nameLinkPairs[player1name]
                    }
                }
            }
        }

        case('SET_PLAYER2DECK_BASED_ON_PLAYER2NAME') : {
            const {nameLinkPairs} = state
            const {player2name} = state.form
            if(nameLinkPairs[player2name]){
                return{
                    ...state,
                    form: {
                        ...state.form,
                        player2deck: nameLinkPairs[player2name]
                    }
                }
            }
        }

        case('SET_SWISSROUND_OR_TOP8ROUND_BASED_ON_TOP8') : {
            //console.log(state.form)
            //const {top8} = state.form
            if(state.form?.top8==='true'){
                return{
                    ...state,
                    form: {
                        ...state.form,
                        swissRound: null 
                    }
                }
            } else if (state.form?.top8==='false'){
                return{
                    ...state,
                    form: {
                        ...state.form,
                        top8Round: 'None'
                    }
                }
            }
            return state
        }

        case('SET_FORM_BASED_ON_SEARCHPARAMS') : {
            let query = {}
            for(const entry of action.payload.entries()){
                query[entry[0]] = entry[1]
            }
            return{
                ...state,
                form: {
                    ...state.form,
                    top8: query.top8round ? query.top8round : '',
                    swissRound: (query.top8round==='false' || !query.top8round) ? query.round : null,
                    top8Round: query.top8round==='true' ? query.round : 'None',
                    event: query.eventName ? query.eventName : ''
                }
            }
        }

        default:
            return state
    }
}