import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllQuizzesThunk } from "../redux/slice/quizSlice";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await dispatch(fetchAllQuizzesThunk());
        if (res.payload?.data) {
          setQuizzes(res.payload.data);
        }
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    }

    fetchQuizzes();
  }, [dispatch]);
  
 
  return (
    <Navbar>
        <div className="min-h-screen bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white p-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
        Explore Quizzes
      </h1>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="p-4 bg-white shadow-xl rounded-lg border border-gray-300 hover:shadow-2xl transition duration-300"
            >
              {/* Quiz Image */}
              <img
                src={quiz.quizImage || "https://via.placeholder.com/150"}
                alt={quiz.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* Quiz Details */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                {quiz.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                Total Questions: {quiz.questions.length || "No Questions Available "}
              </p>
              <p className="text-sm text-gray-500 font-medium mb-4">
                Duration: {quiz.duration} mins
              </p>

              {/* Action Buttons */}
              <div className="flex flex-row justify-between items-center">
                <Link to={`quiz-details/${quiz._id}`}>
                  <button className="py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
                    View Details
                  </button>
                </Link>
                <Link to={`quiz-details/${quiz._id}`}>
                  <button 
                
                  className="py-2 px-4 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition">
                    Play Quiz
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg col-span-full">
            No quizzes available.
          </p>
        )}
      </div>
    </div>
    </Navbar>
  );
}

export default Quiz;
