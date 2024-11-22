import { configureStore } from "@reduxjs/toolkit";
import tabReducer from './slice/tabSlice'
import userReducer from './slice/userSlice'
import quizReducer from './slice/quizSlice'

import profileReducrer from './slice/profileSlice'

const store = configureStore({
    reducer:{
        tab:tabReducer,
        auth:userReducer,
        profileSlice:profileReducrer,
        quiz:quizReducer
    }
})

export default store