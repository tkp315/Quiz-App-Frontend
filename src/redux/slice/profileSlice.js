import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../helpers/axiosInstance"
import toast from "react-hot-toast"
import { customPromiseStyles} from "../../helpers/toastUtils"

const initialState = {
    updatedProfile:JSON.parse(localStorage.getItem('updatedProfile')),
    currProfile:JSON.parse(localStorage.getItem('currProfile'))

}
export const profileThunk = createAsyncThunk('profile',async()=>{
    try{
     const res = await  toast.promise(axiosInstance.get("/profile/profile-details"),{
        
        success:"Fetched Profile details",
        error:(error)=>{
            return error?.response?.data.message||"unable to fetch profile details";

           }
      },{success:{
        style:customPromiseStyles.success
       },
       loading:{
        style:customPromiseStyles.loading
       },
       error:{
        style:customPromiseStyles.error
       }
      })

      return res.data
    }
    catch(error){
        return error.response.data.message
    }
})

export const editProfileThunk = createAsyncThunk('profile-edit',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/profile/edit-profile",data),{
        loading:"Wait..",
        success:"Updated Profile details",
        error:(error)=>{
            return  error?.response?.data.message||"unable to fetch profile details";
           
           }
      },{success:{
        style:customPromiseStyles.success
       },
       loading:{
        style:customPromiseStyles.loading
       },
       error:{
        style:customPromiseStyles.error
       }
      })

      return res.data
    }
    catch(error){
        return error.response.data.message
    }
})

const profile = createSlice({
    name:'profileSlice',
    initialState,
    extraReducers:(builder)=>{
          builder
          .addCase(editProfileThunk.fulfilled,(state,action)=>{
           const res = action.payload.data;
            console.log(res);
            state.updatedProfile= res;
           localStorage.setItem('updatedProfile',JSON.stringify(res))
          })
          .addCase(profileThunk.fulfilled,(state,action)=>{
            console.log(action)
          })
    }

})

export default profile.reducer;