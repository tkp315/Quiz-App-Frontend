import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQuizById, submitQuizThunk } from "../redux/slice/quizSlice";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { EASY, HARD, MEDIUM } from "../helpers/constants";
import QuizReport from "../components/QuizReport";
import Navbar from "../layouts/Navbar";

function PlayQuiz() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [expiredQuestions, setExpiredQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTime, setShowTime] = useState(true);
  const [timerId, setTimerId] = useState(null);
  const [quizReport, setQuizReport] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { quizId } = useParams();
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await dispatch(fetchQuizById({ quizId }));
        if (res.payload?.data) {
          setQuiz(res.payload.data);

          setTimeLeft(res.payload.data?.duration * 60);
        }
      } catch (error) {
        console.error("Failed to fetch quiz details:", error);
      }
    }
    fetchQuiz();
  }, [dispatch, quizId]);

  useEffect(() => {
    if (quiz && quiz.questions?.length > 0) {
      const firstQuestion = quiz.questions.find((q) => q.difficulty === EASY||q.difficulty===MEDIUM || q.difficulty===HARD);
      if (firstQuestion) {
        setCurrQuestion(firstQuestion);
        setQuestionCount(1);
        socket.emit("first-question", firstQuestion);
      }
    }
  }, [quiz, socket]);

  useEffect(() => {
    const handleNextQuestion = ({ question }) => {
      if (question) {
        setCurrQuestion(question);
        setQuestionCount((prevCount) => prevCount + 1);
      } else {
        alert("No more questions available");
      }
    };

    socket.on("next-question", handleNextQuestion);

    return () => socket.off("next-question", handleNextQuestion);
  }, [socket]);
  const handleSubmit = async () => {
    console.log(questionCount);
    if (timerId) {
      clearInterval(timerId); // Stop the timer
      setTimerId(null); // Clear the timer ID
    }

    if (selectedOption) {
      const lastResponse = { id: currQuestion._id, ans: selectedOption };
      setAnswers((prev) => [...prev, lastResponse]);
      setSelectedOption(null); // Clear the selected option
    }

    try {
      const res = await dispatch(
        submitQuizThunk({
          timeRemaining: timeLeft,
          answersArray: [
            ...answers,
            { id: currQuestion._id, ans: selectedOption },
          ],
          quizId: quiz?._id,
        })
      );
      console.log(res);
      if (res.payload.data) {
        setShowTime(true);
        setQuizReport(res.payload.data.report);
        setIsOpen(true);
      }
      //   if (socket.connected) {
      //     socket.disconnect();
      //     console.log('Socket disconnected after quiz submission');
      //   }
      // Log the response after submitting the quiz
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    }
  };

  const handleNext = () => {
    if (currQuestion && selectedOption) {
      const response = { id: currQuestion._id, ans: selectedOption };
      setAnswers((prev) => [...prev, response]); // Save user's response
      setExpiredQuestions((prev) => [...prev, currQuestion._id]); // Mark current question as expired
      socket.emit("check-answers", { quiz, response, expiredQuestions }); // Include expired questions

      setSelectedOption(null);

      if (questionCount === quiz?.questions?.length) {
        handleSubmit();
      } else {
        socket.emit("next-question", { quiz });
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimerId(timer);
        if (selectedOption && questionCount === quiz?.questions?.length) {
          clearInterval(timer);
          setShowTime(false);
        }
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer when the component unmounts or time reaches 0
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  return (
    <Navbar>
      <div className="bg-gradient-to-r from-white via-[#f9f7f4] to-[#ece3da] min-h-screen">
        {/* Header */}
        {isOpen ? (
          <div className="inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
              {/* Close Button */}
              <button
                className="absolute top-2 btn btn-error rounded-md right-2 text-white hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
              {/* Upload Quiz Image Component */}
              <QuizReport report={quizReport} duration={quiz?.duration} />
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 bg-white border-b-2 shadow-md">
              <div className="flex flex-row justify-between items-center">
                <div className="text-xl font-semibold uppercase text-gray-800">
                  <h1>{quiz?.title || "Loading..."}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-gray-600">
                    Question <span className="font-bold">{questionCount}</span>{" "}
                    of{" "}
                    <span className="font-bold">{quiz?.questions?.length}</span>
                  </div>
                  <div className="text-gray-800 font-semibold bg-blue-100 px-4 py-2 rounded-lg shadow">
                    {showTime ? (
                      <>
                        {Math.floor(timeLeft / 60)}:
                        {timeLeft % 60 < 10
                          ? `0${timeLeft % 60}`
                          : timeLeft % 60}
                      </>
                    ) : (
                      "Submitting..."
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-6">
              {/* Question Box */}
              <div className="flex flex-row justify-between items-center text-lg font-medium text-gray-700 shadow-md bg-white p-4 rounded-lg">
                <div className="text-lg">
                  {currQuestion?.question || "No question available"}
                </div>

                {/* Question Tags */}
                <div className="flex flex-row items-center gap-10">
                  {currQuestion?.tags && (
                    <div className="mt-2 pt-2 text-xs text-gray-600 flex flex-wrap gap-2">
                      {currQuestion?.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Marks */}
                  <div className="text-gray-600">
                    <span className="font-bold">
                      {currQuestion?.marks || 0} Marks
                    </span>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-flow-row grid-cols-2 gap-4">
                {currQuestion?.options?.map((option, index) => (
                  <label
                    key={index}
                    onClick={() => {
                      // setSelectedOption(option)
                      if (questionCount === quiz?.question?.length) {
                        const response = { id: currQuestion._id, ans: option };
                        setAnswers((prev) => [...prev, response]);
                      } else {
                        setSelectedOption(option);
                      }
                    }}
                    className={`btn w-full p-4 text-left border ${
                      selectedOption === option
                        ? "border-blue-500 outline outline-2 outline-blue-500"
                        : "border-gray-200"
                    } hover:border-blue-300 hover:bg-blue-100 transition`}
                  >
                    {option}
                  </label>
                )) || "No options available"}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-row items-center justify-end p-4 bg-white border-t-2 shadow-md">
              <button
                onClick={handleNext}
                className="btn btn-primary px-6 py-2"
              >
                {questionCount === quiz?.questions?.length ? "Submit" : "Next"}
              </button>
            </div>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default PlayQuiz;
