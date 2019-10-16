

const cartItems = (state = [], action) => {

    
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload]
       case 'LOAD_ITEMS':
            return state=action.payload
        case 'DEL_ITEM':
            return state.filter(state => state.cart_id !== action.payload)
        case 'ERROR':
            return [...state, action.payload]
    }

    return state
}

export default cartItems
