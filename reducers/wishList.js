
const wishList = (state = [], action) => {

    
switch (action.type) {
    case 'ADD_TO_WishList':
        return [...state, action.payload]
    case 'LOAD_WISHLIST':
        return state=action.payload
    case 'DEL_WISHLIST':
        return state.filter(state => state.wishlist_id !== action.payload)
    case 'ERROR':
        return [...state, action.payload]
}
return state
}

export default wishList
