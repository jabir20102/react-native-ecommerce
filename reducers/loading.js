
const loading = (state = false, action) => {

    
    switch (action.type) {
        case 'LOADING':
            return state=action.payload
        case 'STOP_LOADING':
            return state=action.payload
        default:
             return state
    }
    
    }
    
    export default loading
    