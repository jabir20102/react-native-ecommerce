
import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartItems from '../reducers/cartItems';
import wishList from '../reducers/wishList';
import reviews from '../reducers/reviews';
import loading from '../reducers/loading';


const rootReducer = combineReducers({cartItems, wishList,reviews,loading})

 const  store = createStore(rootReducer,applyMiddleware(thunk))

 export default store;
