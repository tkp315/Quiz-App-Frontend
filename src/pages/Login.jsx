
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../redux/slice/userSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { showErrorToast } from "../helpers/toastUtils";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputData = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const formData = {
      email: state.email,
      password: state.password,
    };

    try {
      const res = await dispatch(loginThunk(formData));
      if (res.payload) {  
        navigate("/"); 
      } 
    } catch (err) {
      const errMsg = axios.isAxiosError(err) ? err.response?.data || "An error occurred" : "An error occurred";
      showErrorToast(errMsg)
  };
}
 
  return (
    <div className=" p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Login
      </h2>
      <form 
      onSubmit={handleFormSubmission}
      className=" flex flex-col gap-2 ">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            placeholder={`Enter Email here..`}
            id="email"
            name="email"
            type="email"
            onChange={handleInputData}
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            placeholder={`Enter Password here..`}
            id="password"
            name="password"
            type="password"
            onChange={handleInputData}
          ></input>
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-3 px-4 bg-[#007bff] text-white rounded-md shadow-lg hover:bg-[#0056b3] transition-all duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
