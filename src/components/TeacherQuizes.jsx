import { useEffect, useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { myQuizzes } from "../redux/slice/quizSlice";
import UploadQuizImage from "./UploadQuizImage";
import { Link } from "react-router-dom";

function TeacherQuizes() {
  const [myQuizzesArr, setMyQuizzes] = useState([]);
  const [selectedQuizId,setSelectedQuizId] = useState("")
  const dispatch = useDispatch();
  const {quiz} = useSelector((state)=>state);
  const {isQuizUpdated} =quiz;

  useEffect(() => {
    async function fetchQuizzes() {
      const res = await dispatch(myQuizzes());
      if (res.payload.data.quizzes) {
        setMyQuizzes(res.payload.data.quizzes);
      } 
    }
    fetchQuizzes();
  }, [isQuizUpdated,dispatch,]);

  const [isOpen, setIsOpen] = useState(false);
  const isQuizArray = myQuizzesArr.length > 0;
  const [active,setActive] = useState("editPhoto")

  return (
    <div className="flex flex-col px-10 py-4 m-10 shadow-md bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white border-b-2 border-slate-200 rounded-md gap-4 relative">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        My Quizzes
      </h2>

      {/* Create New Quiz Button */}
      <Link to='/create-quiz'>
      <button className="btn btn-info flex items-center gap-2 rounded-md w-fit">
        <FaPlus /> New Quiz
      </button>
      </Link>

      {/* Scrollable Container */}
      <div className="overflow-y-scroll h-[40vh]">
        {isQuizArray ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myQuizzesArr.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col items-start"
              >
                {/* Quiz Image with Edit Icon */}
                <div className="relative w-full h-32 mb-4">
                  {item.quizImage ? (
                    <img
                      src={item.quizImage}
                      alt={item.title || "Quiz"}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {/* Edit Icon */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow-md hover:bg-blue-700"
                    onClick={() => {
                        setIsOpen(true)
                        setActive("editPhoto")
                        setSelectedQuizId(item._id)
                    }} // Replace alert with actual edit logic
                  >
                    
                 <FaPen size={14}/>
                  </button>
                </div>

                {/* Quiz Details */}
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {item.title || "Untitled Quiz"}
                </h3>
                <p className="text-sm text-gray-500 mb-2 font-semibold">
                  Duration: {`${Math.floor(item.duration/60)} : ${Math.floor(item.duration% 60)<10?`0${item.duration % 60}`:`${item.duration % 60}`}` } mins

                  
                </p>
                <p className="text-sm text-gray-500 mb-2 font-semibold">
                  Questions: {item.questions?.length || 0}
                </p>
                <button 
                onClick={()=>{
                    setIsOpen(true)
                    setActive("questions")
                }}
                className="text-sm font-medium text-blue-600 hover:underline">
                  Add More Questions
                </button>
              </div>
            ))}
            {
                isOpen?<UploadQuizImage/>:""
            }
          </div>
        ) : (
          <p className="text-center text-gray-600">No Quizzes Found</p>
        )}
      </div>
      {
      isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={()=>setIsOpen(false)}
            >
              ✕
            </button>
            {/* Upload Quiz Image Component */}
            <UploadQuizImage quizId={selectedQuizId} />
          </div>
        </div>
      )
      }
    </div>
  );
}

export default TeacherQuizes;
