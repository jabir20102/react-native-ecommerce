
const reviews = (state = [], action) => {

    
    switch (action.type) {
        case 'ADD_TO_REVIEW':
            return [...state, action.payload]
        case 'LOAD_REVIEW':
            return state=action.payload
        case 'DEL_REVIEWS':
            return state.filter(state => state.comment_id !== action.payload)
        case 'ERROR':
            return [...state, action.payload]
    }
    return state
    }
    
    export default reviews
    