
import { useState } from "react";
import quiz from "../assets/create-quiz.jpeg";
import QuestionModal from "../components/QuestionModal";
import Navbar from "../layouts/Navbar";
import { useDispatch } from "react-redux";
import { createQuizThunk } from "../redux/slice/quizSlice";
function CreateQuiz() {
  const [state, setState] = useState({
    // questions:[""],
    title: "",
    duration: null,
    instructions: "",
    isNegativeMarking: false,
    negMark:null,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);
  const dispatch = useDispatch()
  const handlingModal = (modalState) => {
    setIsOpen(modalState);
  };

  const handlelingQuestionArray = (data) => {
    setQuestionArray(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
   
        setState({ ...state, [name]: value });
    
    console.log(`${name}:${value}`)
  };
  console.log(questionArray);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const dataObj = {
        ...state,
        questions:questionArray
    }
    try {
      const res = await dispatch(createQuizThunk(dataObj));
      if (res.payload?.statusCode === 200) {
        console.log("Quiz created successfully:", res.payload);
        // Optionally reset the form state or show a success message
      } else {
        console.error("Failed to create quiz:", res.payload?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  
  return (
    <Navbar>
      <div
        className="flex px-10 py-4 m-10 shadow-md bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white 
    border-b-2 border-slate-200 rounded-md flex-row items-center justify-between gap-4 relative"
      >
        {isOpen ? (
          <QuestionModal
            modalHandling={handlingModal}
            questionArrayHandling={handlelingQuestionArray}
          />
        ) : (
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 w-1/2">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 flex-row gap-2">
              <p>Create Quiz</p>
            </h2>

            <form
              onSubmit={handleFormSubmission}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-row gap-4 items-center">
                {/* Title Input */}
                <div className="flex flex-col w-1/2 mr-3 gap-1">
                  <label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder="Enter Title here.."
                    id="title"
                    name="title"
                    type="text"
                    value={state.title}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Duration*/}
                <div className="flex flex-col w-1/2 gap-1">
                  <label
                    htmlFor="duration"
                    className="text-sm font-medium text-gray-600"
                  >
                    Duration
                  </label>
                  <div>
                    <input
                      className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500 w-full"
                      placeholder="Enter Duration here.."
                      id="duration"
                      name="duration"
                      type="number"
                      value={state.duration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-4 items-center">
                {/* isNegative Input */}
                <div className="flex flex-col w-1/2 mr-3 gap-1">
                  <label
                    htmlFor="isNegative"
                    className="text-sm font-medium text-gray-600"
                  >
                    Is Negative Marking
                  </label>
                  <div className="flex flex-row gap-3 items-center">
                    <label className="flex flex-row gap-2 ">
                      <span className="label-text">True</span>
                      <input
                          onChange={() => setState({ ...state, isNegativeMarking: true })}
                        className=" radio checked:bg-red-500 defaultChecked"
                        type="radio"
                        name="isNegativeMarking"
                        
                      ></input>
                    </label>

                    <label className="flex flex-row gap-2 ">
                      <span className="label-text">False</span>
                      <input
                        onChange={() => setState({ ...state, isNegativeMarking:false })}
                        className=" radio checked:bg-blue-500 defaultChecked "
                        type="radio"
                        name="isNegativeMarking"
                      ></input>
                    </label>
                  </div>
                </div>

                {/* negative marks*/}
              {
                state.isNegativeMarking?  <div className="flex flex-col w-1/2 gap-1">
                <label
                  htmlFor="negMark"
                  className="text-sm font-medium text-gray-600"
                >
                  Negative Marks
                </label>
                <div>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500 w-full"
                    placeholder="Enter negative marking here.."
                    id="negMark"
                    name="negMark"
                    type="number"
                    value={state.negMark}
                    onChange={handleInputChange}
                  />
                </div>
              </div>:""
              }
              </div>

              <div className="flex flex-row gap-4 items-center">
                {/* negative marks*/}
                <div className="flex flex-col w-1/2 gap-1">
                  <label
                    htmlFor="instructions"
                    className="text-sm font-medium text-gray-600"
                  >
                    Instructions
                  </label>
                  <div>
                    <textarea
                      className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500 w-full"
                      placeholder="Write comma between two instructions"
                      id="instructions"
                      name="instructions"
                      type="text"
                      value={state.instructions}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* questions Input */}
                <div className="flex flex-col w-1/2 ml-3 gap-1">
                  <button
                    className="btn btn-primary w-full  rounded-md"
                    type="button"
                    onClick={() => setIsOpen(true)}
                  >
                    Add Questions
                  </button>
                </div>
              </div>

              <button
                className="btn btn-success w-full mt-4 rounded-md"
                type="submit"
              >
                Create Quiz
              </button>
            </form>
          </div>
        )}

        {!isOpen ? (
          <div className="w-1/2 flex justify-center ">
            <img
              className="rounded-lg  w-full shadow-2xl  h-auto  object-cover"
              src={quiz}
              alt="teacher Illustration"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </Navbar>
  );
}

export default CreateQuiz;
