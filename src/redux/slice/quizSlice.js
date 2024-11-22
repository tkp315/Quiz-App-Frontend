import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import { customPromiseStyles} from "../../helpers/toastUtils";


const initialState = {
questionSet:JSON.parse(localStorage.getItem('questionSet'))||[],
quizSet:JSON.parse(localStorage.getItem('quizSet'))||[],
isQuizUpdated:localStorage.getItem('isQuizUpdated')||'false',
areQuestionsUpdated:localStorage.getItem('areQuestionsUpdated')||'false',
myResults:localStorage.getItem('myResults')
}


export const createQuestionThunk = createAsyncThunk('question-thunk',async(data)=>{
    try{
        console.log(data)
     const res = await  toast.promise(axiosInstance.post("/question/create-question",data),{
        loading:"Wait..",
        success:"Question Added Successfully",
        error:(error)=>{
            const errMsg = error?.response?.data.message||"Adding question failed";
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})

export const createQuizThunk = createAsyncThunk('quiz-thunk',async(data)=>{

    try{
        console.log(data)
     const res = await  toast.promise(axiosInstance.post("/quiz/create-quiz",data),{
        loading:"Wait..",
        success:"Successfully created Quiz!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||"creating quiz failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})

export const myQuestions = createAsyncThunk('my-questions',async()=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/question/my-questions"),{
        loading:"Wait..",
        success:"Successfully Fetched Questions!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||"Fetching questions failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})

export const myQuizzes = createAsyncThunk('my-quizzes',async()=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/quiz/my-quizes"),{
        loading:"Wait..",
        success:"Successfully Fetched Quizzes!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||"Fetching questions failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})
export const uploadQuizImageThunk = createAsyncThunk('quiz-image',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/quiz/quiz-image",data),{
        loading:"Wait..",
        success:"Successfully uploaded  Picture!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||"Uploading Image failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})
export const fetchAllQuizzesThunk = createAsyncThunk('quiz-all',async()=>{
    try{
     const res = await  toast.promise(axiosInstance.get("/quiz/all-quizes"),{
        loading:"Wait..",
        success:"Successfully Fetched all Quizzes!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||"Fetching Quizzes Failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})


export const fetchQuizById = createAsyncThunk('quiz-id',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/quiz/quiz-by-id",data),{
        loading:"Wait..",
        success:"Successfully Fetched  Quiz!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||"Fetching Quiz Failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})

export const submitQuizThunk = createAsyncThunk('quiz-submit',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/quiz/submit-quiz",data),{
        loading:"Wait..",
        success:"Successfully Submitted Quiz!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||" Quiz Submission Failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})
export const reportThunk = createAsyncThunk('quiz-report',async()=>{
    try{
     const res = await  toast.promise(axiosInstance.get("/report/reports"),{
        loading:"Wait..",
        success:"Successfully Fetched Reports!",
        error:(error)=>{
            const errMsg = error?.response?.data.message||" Fetching Reports Failed";
            return errMsg
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

     return  res.data;
    }
    catch(error){
        return error.response.data.message
    }
})
const quiz = createSlice({
    name:'quiz',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(myQuestions.fulfilled,(state,action)=>{
        console.log(action.payload.data.questions);
        state.questionSet =action?.payload?.data?.questions;
        localStorage.setItem('questionSet',JSON.stringify(action.payload.data.questions));
       })
       .addCase(myQuizzes.fulfilled,(state,action)=>{
        console.log(action)
       })
       .addCase(uploadQuizImageThunk.fulfilled,(state)=>{
        state.isQuizUpdated=true;
        localStorage.setItem('isQuizUpdated','true')
       })
       .addCase(createQuestionThunk.fulfilled,(state)=>{
        state.areQuestionsUpdated=true;
        localStorage.setItem('areQuestionsUpdated','true')
       })
       .addCase(reportThunk.fulfilled,(state,action)=>{
         console.log(action.payload)
       })
    }

})

export default quiz.reducer