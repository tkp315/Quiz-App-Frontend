import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myQuestions } from "../redux/slice/quizSlice";
import PropType from 'prop-types'
function QuestionModal({ modalHandling, questionArrayHandling }) {
    const [questionsArray,setQuestionsArray] =useState([]);
    const [totalQuestions,setTotalQuestions] =useState([]);
    const {quiz} = useSelector((state)=>state);
    const {areQuestionsUpdated}=quiz;
   console.log(questionsArray)

  function handleQuestionArray(e,id){
    if(e.target.checked){
        setQuestionsArray((prev)=>{
         return prev.includes(id)?prev:[...prev,id]
        })
    }
    else {
        setQuestionsArray((prev)=>{
        return prev.filter((e)=>e!==id)
        })
    }
   }
   const dispatch = useDispatch();
   useEffect(()=>{
    const fetchQuestions = async()=>{
        const res = await dispatch(myQuestions());
        console.log(res);
        if(res.payload.data.questions){
         setTotalQuestions(res.payload.data.questions)
        }
    }
    fetchQuestions()
   },
    
   [areQuestionsUpdated,dispatch])
   questionArrayHandling(questionsArray)
  return (
    <div className="flex justify-center items-center px-4 py-6 w-full h-screen bg-black bg-opacity-30 fixed top-0 left-0 z-50  ">
      <div className="p-6 overflow-y-scroll h-[50vh] bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-2xl font-bold text-gray-800">
            Select Questions
          </h2>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => modalHandling(false)}
          >
            Close
          </button>
        </div>

        {/* Question List */}
        <div className="space-y-4" >
          {totalQuestions?.map((item) => (
            <div
              key={item._id}
              className="flex  justify-between items-center p-4 shadow-md bg-gradient-to-r from-[#eddabe] via-[#efe8e2] to-white border rounded-md"
            >
              <p className="text-gray-800">{item.question}</p>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary cursor-pointer "
                value={item._id}
                onChange={(e)=>handleQuestionArray(e,item._id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

QuestionModal.propTypes = {
  modalHandling:PropType.func,
  questionArrayHandling:PropType.func
  }
export default QuestionModal;
