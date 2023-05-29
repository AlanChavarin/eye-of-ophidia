export const INITIAL_STATE = {
    form: {
        name: '',
        location: '',
        format: 'Classic Constructed',
        startDate: '',
        endDate: '',
        top8Day: false,
        dayRoundArr: [],
        description: '',
        notATypicalTournamentStructure: false,
        image: null,
        resetImage: false,
    },
    isMultiDay: false,
    deletePopup: false,
}

export const postEventReducer = (state, action) => {
    switch (action.type) {
        case('SET_FORM') : 
            return {
                ...state,
                form: action.payload
            }
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
        case('UPDATE_DAYROUNDARR') :
            return {
                ...state,
                form: {
                    ...state.form,
                    dayRoundArr: action.payload
                }
            }
        case('UPDATE_ISMULTIDAY') :
            return {
                ...state,
                isMultiDay: action.payload
            }
        case('UPDATE_DELETEPOPUP') :
            return {
                ...state,
                deletePopup: action.payload
            }
        case('UPDATE_IMAGE') : 
            return {
                ...state,
                form: {
                    ...state.form,
                    image: action.payload.target.files[0]
                }
            }
        case('DELETE_IMAGE') : 
            return {
                ...state,
                form: {
                    ...state.form,
                    image: null
                }
            }
        default:
            return state
    }
}