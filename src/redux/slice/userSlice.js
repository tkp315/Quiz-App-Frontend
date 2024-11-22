import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../helpers/axiosInstance"
import toast from "react-hot-toast"
import { customPromiseStyles } from "../../helpers/toastUtils"

const initialState = {
    isLoggedIn:JSON.parse(localStorage.getItem('isLoggedIn')||false),
    user: JSON.parse(localStorage.getItem('userObject'))||{},
    googleUser:JSON.parse(localStorage.getItem('googleUser')),
    profile:JSON.parse(localStorage.getItem('profile'))||{}
}
export const signupThunk = createAsyncThunk('signup-thunk',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/user/signup",data),{
        loading:"Wait..",
        success:"Account created Successfully",
        error:(error)=>{
            const errMsg=error?.response?.data.message||"Sign In Failed"
            return errMsg
           }
      },{
        success:{
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

export const loginThunk = createAsyncThunk('login-thunk',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/user/login",data),{
        loading: 'Logging in...',
        success: (response) =>{ `Welcome back!` 
            console.log(response)},
        error: (error) =>
          error?.response?.data?.message || 'Login failed. Please try again.',
      },{
        
            success:{
             style:customPromiseStyles.success
            },
            loading:{
             style:customPromiseStyles.loading
            },
            error:{
             style:customPromiseStyles.error
            }
           
      })

      const userData = res.data;

      const profileRes = await axiosInstance.get('/profile/profile-details');
      const profileData = profileRes.data
      return {userData,profileData}
    }
    catch(error){
        return error.response.data.message
    }
})
export const logoutThunk = createAsyncThunk('logout-thunk',async()=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/user/logout"),{
       
        loading: 'Logging out...',
        success: () => "Logged out",
        error: (error) =>
          error?.response?.data?.message || 'Logout failed. Please try again.',
      },{
       success:{
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

export const deleteAccountThunk = createAsyncThunk('delete-thunk',async()=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/user/delete-account"),{
        loading:"Wait..",
        success:"Account Successfully Deleted",
        error:(error)=>{
            const errMsg=error?.response?.data.message||"Account Deletion Failed"
            return errMsg
           }
      },{
        success:{
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


const user = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setGoogleUser:(state,action)=>{
           console.log(action)
           state.googleUser= action.payload;
           localStorage.setItem('googleUser',JSON.stringify(state.googleUser))
        }
    },
    extraReducers:(builder)=>{
          builder
          .addCase(loginThunk.fulfilled,(state,action)=>{
            console.log(action.payload)
           const userRes = action?.payload?.userData?.data;
           const profileRes = action?.payload?.profileData?.data;
            
           state.isLoggedIn=true;
           localStorage.setItem('isLoggedIn','true');
           state.user = userRes.loggedInUser;
           localStorage.setItem('userObject',JSON.stringify(userRes.loggedInUser))
           state.profile= profileRes;
           localStorage.setItem('profile',JSON.stringify(profileRes))
           localStorage.removeItem('updatedProfile')
          })
          .addCase(logoutThunk.fulfilled,(state)=>{
            state.isLoggedIn=false;
            localStorage.clear()
            state.googleUser={},
            state.isLoggedIn=false;
            state.profile={}
            state.user={};
          })
          .addCase(deleteAccountThunk.fulfilled,(state)=>{
            state.isLoggedIn=false;
            localStorage.clear()
            state.googleUser={},
            state.isLoggedIn=false;
            state.profile={}
            state.user={};
          })
    }

})
export const {setGoogleUser} = user.actions;
export default user.reducer;