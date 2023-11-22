import {configureStore} from '@reduxjs/toolkit'
import {persistStore} from 'redux-persist'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './UserSlice/userSlice'


// configuring the storae space of data when persistance
const persistConfig = {
    key : 'root',
    storage
}


// making a persistance data including some logic for persistance with config and slice,its only creating a data for persistance,its only stored in storage as persistance in susequent steps
const persisted = persistReducer(persistConfig,userSlice)

// creating store
const store = configureStore({
    reducer : {
        // setting the state as persisted value,so it will ensure that if we trying to update it will perisist with new value and showing the persisted to dom 
        user : persisted
    }    
})

const persistor = persistStore(store)

export {store , persistor}  