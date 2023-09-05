import { createStore , combineReducers }  from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import Reducer from '../Reducers/Reducer.js';
//import { getDefaultMiddleware } from '@reduxjs/toolkit';

let reducer =  combineReducers({Reducer})

export default store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
// export default store = createStore(rootReducer)