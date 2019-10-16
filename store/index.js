
import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartItems from '../reducers/cartItems';



 const  store = createStore(cartItems,applyMiddleware(thunk))

 export default store;
