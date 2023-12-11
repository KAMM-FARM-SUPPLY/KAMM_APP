import { createStore , combineReducers }  from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import Reducer from '../Reducers/Reducer.js';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {persistReducer , persistStore} from 'redux-persist'
//import { getDefaultMiddleware } from '@reduxjs/toolkit';

let reducer =  combineReducers({Reducer})

const persistConfig = {
  key : 'root',
  storage : AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig , reducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
// export default store = createStore(rootReducer)