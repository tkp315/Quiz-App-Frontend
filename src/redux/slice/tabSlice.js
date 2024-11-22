import { createSlice } from "@reduxjs/toolkit";

const initialState={
  currTab:""
}

const tabSlice = createSlice({
name:'tab',
initialState,
reducers:{
    tabSwitcher:(state,action)=>{
        console.log(action.payload);
        state.currTab= action.payload.selectedTabId
    },
}
})

export const {tabSwitcher}  = tabSlice.actions

export default tabSlice.reducer;