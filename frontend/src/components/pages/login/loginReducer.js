export const INITIAL_STATE = {
    form: {
        name: '',
        email: '',
        password: '',
        password2: ''
    },
    registrationMode: false,
    resendVerificationEmailData: ''
}

export const loginReducer = (state, action) => {
    switch (action.type) {
        case('UPDATE_FORM') : 
            return {
                ...state,
                form: {
                    ...state.form,
                    [action.payload.target.name]: action.payload.target.value
                }   
            }
        case('UPDATE_REGISTRATION_MODE') :
            return {
                ...state,
                registrationMode: action.payload
            }
        case('UPDATE_RESENDVERIFICATIONEMAILDATA') : 
            return{
                ...state,
                resendVerificationEmailData: action.payload
            }
        default: 
            return state
    }
    
}