import  { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { myQuestions } from '../redux/slice/quizSlice';

function TeacherQuestion() {
    const {quiz} = useSelector((state)=>state);
    const {areQuestionsUpdated}=quiz;
    const [questionSet,setQuestionSet] = useState([])
    const dispatch = useDispatch();
    useEffect(()=>{
     const fetchQuestions = async()=>{
         const res = await dispatch(myQuestions());
         console.log(res);
         if(res.payload.data.questions){
          setQuestionSet(res.payload.data.questions)
         }
     }
     fetchQuestions()
    },
     
    [areQuestionsUpdated,dispatch])

    const isQuestionArray = questionSet.length > 0 ? true : false;
  return (
    <div className="flex px-10 py-2 m-10 shadow-md bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white border-b-2 border-slate-200 rounded-md flex-col  gap-4 relative">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
      My Questions
    </h2>
    <Link to='/create-question'>
    <button className="btn btn-info rounded-md w-fit ">
      <FaPlus /> New Question
    </button>
    </Link>
    <div className=" overflow-y-scroll h-[50vh] flex flex-col gap-3">
      {isQuestionArray
        ? questionSet.map((item,idx) => (
            <div
              key={item._id}
              className="py-2 px-6 bg-white rounded-lg shadow-lg border border-gray-200 w-full"
            >
              <div className='flex flex-col gap-2'>
               <button className='w-fit px-2 py-1 bg-slate-300 rounded-md'>
               {idx+1}
               </button>
              <p className="space-x-3">
                  {item.question}
              </p>
              <ol type='i' className='flex flex-row gap-4 list-decimal px-4 space-x-5'>
                {
                    item.options.map((e,idx)=>(
                        <li key={idx} className=''>
                             {e}
                        </li>
                    ))
                }
              </ol>
              </div>
            </div>
          ))
        : (
            <div
            className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 w-full"
          >
            <p className="">
                NO QUESTIONS FOUND
            </p>
          </div>
        )}
    </div>
    {/* heading -center */}
    {/* create-new question btn*/}
    {/* show all the questions created by me*/}
  </div>
  )
}

export default TeacherQuestion
