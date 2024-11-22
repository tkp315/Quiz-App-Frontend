import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadQuizImageThunk } from "../redux/slice/quizSlice";
import PropType from 'prop-types'

function UploadQuizImage({ quizId }) {
  const [preview, setPreview] = useState(null);
  const [quizImg, setQuizImg] = useState(null);
  const dispatch = useDispatch();

  const handleFile = (e) => {
    const file = e.target?.files[0];
    if (file) {
      setQuizImg(file);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () =>
        setPreview(fileReader.result)
      );
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!quizImg) {
      alert("Please select an image before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("quizImage", quizImg);
    formData.append("quizId", quizId);

    // Dispatch the action or make an API call
    console.log("Submitting formData:", quizImg, quizId);
    dispatch(uploadQuizImageThunk(formData));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Outer container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center gap-6">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Upload Quiz Thumbnail
        </h2>

        {/* File Input */}
        <label className="w-full flex flex-col items-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition">
          <span className="text-gray-500">
            {quizImg ? quizImg.name : "Click to select an image"}
          </span>
          <input
            type="file"
            name="quizImage"
            className="hidden"
            onChange={handleFile}
          />
        </label>

        {/* Preview Section */}
        {preview && (
          <div className="w-full flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
          </div>
        )}

        {/* Buttons */}
        <button
          onClick={handleSubmission}
          type="button"
          className="w-full py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

UploadQuizImage.propTypes = {
    quizId:PropType.string
}
export default UploadQuizImage;
