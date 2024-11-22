
import { axiosInstance } from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

function UploadFile() {
    const handleFile =async(e)=>{
     const file = e.target?.files[0];

     const formData = new FormData();
     formData.append('csvFile',file);

     try {
        const res = await axiosInstance.post('/question/import-question',formData);
        toast.success("Successfully imported the questions!", {
            duration: 3000,
            position: "bottom-right",
            style: {
                backgroundColor: "#d4edda",
                color: "#155724",
                padding: "16px", // Increased padding
                border: "1px solid #c3e6cb",
                borderRadius: "8px",
                borderStyle:'dashed'
              },
          });
     console.log(res.data);
     } catch (error) {
        const errMsg = axios.isAxiosError(error)?error.response.data :"An Error Occured"
        toast.error(errMsg, {
            duration: 5000,
            position: "bottom-right",
            style: {
                backgroundColor: "#f8d7da",
                color: "#721c24",
                padding: "16px", // Increased padding
                border: "1px solid #f5c6cb",
                borderRadius: "8px",
              },
          });
     }
    }
  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      {/* Outer container with dashed border */}
      <div className="w-1/2 bg-white p-6 rounded-md shadow-2xl border-2 border-dashed border-blue-500 flex flex-col justify-center items-center gap-4">
        <p className="text-gray-600 font-medium text-center">
          click below to upload file
        </p>
        
        {/* Upload button */}
        <label className="btn btn-info cursor-pointer rounded-md">
          <input
            type="file"
            name="csvFile"
            accept=".csv"
            className="hidden"
            onChange={handleFile}
          />
          Choose File
        </label>
       
      </div>

      
    </div>
  );
}

export default UploadFile;
