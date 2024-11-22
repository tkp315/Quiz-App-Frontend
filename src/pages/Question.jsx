import  { useState } from "react";
import Navbar from "../layouts/Navbar";
import { EASY, HARD, MEDIUM } from "../helpers/constants";
import { useDispatch } from "react-redux";
import { createQuestionThunk } from "../redux/slice/quizSlice";
import UploadFile from "../components/UploadFile";
function Question() {
  const [formData, setFormData] = useState({
    question: "",
    correct_ans: "",
    difficulty: "",
    marks: "",
    options: [""],
    tags: [""],
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle options/tags input change
  const handleArrayChange = (e, index, arrayName) => {
    const { value } = e.target;
    const updatedArray = [...formData[arrayName]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [arrayName]: updatedArray,
    }));
  };

  // Add new option/tag
  const addArrayItem = (arrayName) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], ""],
    }));
  };

  // Remove an option/tag
  const removeArrayItem = (index, arrayName) => {
    const updatedArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [arrayName]: updatedArray,
    }));
  };
const dispatch = useDispatch()
  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const formDataObject = new FormData();
    const keyArray = Object.keys(formData);

    for (const key of keyArray) {
      if (key !== "options" && key !== "tags") {
        formDataObject.append(`${key}`, [key]);
      }
    }
    for(const e of formData.options){
        formDataObject.append('options',e);
    }
    for(const e of formData.tags){
        formDataObject.append('tags',e);
    }
    console.log(formDataObject)


    const res = await dispatch(createQuestionThunk(formData))
    if(res.payload.statusCode===200){
        formData.correct_ans="",
        formData.difficulty="",
        formData.marks="",
        formData.options=[""],
        formData.tags=[""],
        formData.question=""
    }
    console.log(res)
  };

  return (
    <Navbar>
      <div className="flex px-10 py-4 m-10 shadow-md bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white border-b-2 border-slate-200 rounded-md flex-row items-center justify-between gap-4 relative">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Question Creation
          </h2>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4 items-center">
              {/* Question Input */}
              <div className="flex flex-col w-1/2 mr-3 gap-1">
                <label
                  htmlFor="question"
                  className="text-sm font-medium text-gray-600"
                >
                  Question
                </label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="Enter question here.."
                  id="question"
                  name="question"
                  type="text"
                  value={formData.question}
                  onChange={handleInputChange}
                />
              </div>

              {/* Marks */}
              <div className="flex flex-col w-1/2 gap-1">
                <label
                  htmlFor="marks"
                  className="text-sm font-medium text-gray-600"
                >
                  Marks
                </label>
                <div>
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500 w-full"
                    placeholder="Enter marks here.."
                    id="marks"
                    name="marks"
                    type="text"
                    value={formData.marks}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className=" flex flex-col gap-2 w-1/2 mr-3">
                <label
                  htmlFor="difficulty"
                  className="text-sm font-medium text-gray-600"
                >
                  Difficulty
                </label>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500 outline-none"
                  name="difficulty"
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select difficulty
                  </option>
                  <option value={EASY}>{EASY}</option>
                  <option value={MEDIUM}>{MEDIUM}</option>
                  <option value={HARD}>{HARD}</option>
                </select>
              </div>
              {/* Correct Answer */}
              <div className="flex flex-col w-1/2 gap-1">
                <label
                  htmlFor="correct_ans"
                  className="text-sm font-medium text-gray-600"
                >
                  Correct Answer
                </label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder="Enter correct answer here.."
                  id="correct_ans"
                  name="correct_ans"
                  type="text"
                  value={formData.correct_ans}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-row  justify-between gap-4 items-center ">
              {/* Tags Array */}
              <div className="flex flex-col gap-1 w-1/2 ">
                <label
                  htmlFor="tags"
                  className="text-sm font-medium text-gray-600"
                >
                  Tags
                </label>
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                      placeholder={`Tag ${index + 1}`}
                      name={`tag-${index}`}
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayChange(e, index, "tags")}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-error"
                      onClick={() => removeArrayItem(index, "tags")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn rounded-md btn-secondary mt-2"
                  onClick={() => addArrayItem("tags")}
                >
                  Add Tag
                </button>
              </div>

              {/* Options Array */}
              <div className="flex flex-col gap-2 w-1/2">
                <label
                  htmlFor="options"
                  className="text-sm font-medium text-gray-600"
                >
                  Options
                </label>
                {formData.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center gap-2 "
                  >
                    <input
                      className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                      placeholder={`Option ${index + 1}`}
                      name={`option-${index}`}
                      type="text"
                      value={option}
                      onChange={(e) => handleArrayChange(e, index, "options")}
                    />
                    <button
                      type="button"
                      className="btn  btn-sm btn-error"
                      onClick={() => removeArrayItem(index, "options")}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn rounded-md btn-secondary mt-2"
                  onClick={() => addArrayItem("options")}
                >
                  Add Option
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary w-full mt-4 rounded-md"
              type="submit"
            >
              Create Question
            </button>
          </form>
         
        </div>
     <UploadFile/>
      </div>
    </Navbar>
  );
}

export default Question;
