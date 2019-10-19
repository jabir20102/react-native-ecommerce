
import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartItems from '../reducers/cartItems';
import wishList from '../reducers/wishList';


const rootReducer = combineReducers({cartItems, wishList})

 const  store = createStore(rootReducer,applyMiddleware(thunk))

 export default store;
