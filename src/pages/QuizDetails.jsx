import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchQuizById } from "../redux/slice/quizSlice";

function QuizDetails() {
  const { quizId } = useParams(); // Quiz ID from URL params
  console.log(quizId)
  const [quiz, setQuiz] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuizDetails() {
      try {
        const res = await dispatch(fetchQuizById({quizId}))
        console.log(res)
        if (res.payload?.data) {
          setQuiz(res.payload.data);
        }
      } catch (error) {
        console.error("Failed to fetch quiz details:", error);
      }
    }

    fetchQuizDetails();
  }, [quizId, dispatch]);

  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  const { title, questions, isNegativeMarking, duration, instructions } = quiz;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white p-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Quiz Details
      </h1>

      {/* Details Card */}
      <div className="bg-white p-8 shadow-xl gap-2 flex flex-col  rounded-lg max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl text-center uppercase font-bold text-gray-800 mb-4">{title}</h2>

        {/* Details */}
        <ul className="space-y-4">
          <li className="text-lg text-gray-700">
            <strong>Total Questions:</strong> {questions.length}
          </li>
          <li className="text-lg text-gray-700">
            <strong>Negative Marking:</strong> {isNegativeMarking ? "Yes" : "No"}
          </li>
          <li className="text-lg text-gray-700">
            <strong>Duration:</strong> {duration} mins
          </li>
          <li className="text-lg text-gray-700">
            <strong>Instructions:</strong>
            <ul className="list-disc list-inside mt-2">
              {instructions.length > 0 ? (
                instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-600">
                    {instruction}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No instructions provided.</p>
              )}
            </ul>
          </li>
        </ul>
        <div className="flex flex-row justify-center gap-14 items-center">
               
               <button 
               onClick={()=>navigate(-1)}
               className="py-2 px-4 btn-outline text-black border  rounded-md hover:shadow  transition">
                 Back
               </button>
             
             <Link to={`/quizzes/play-quiz/${quiz._id}`}>
               <button className="py-2 px-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition">
                 Play Quiz
               </button>
             </Link>
           </div>
      </div>
    
    </div>
  );
}

export default QuizDetails;
