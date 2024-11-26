import * as Yup from "yup";
import { STUDENT, TEACHER } from "../helpers/constants";
import { signupData } from "../helpers/data";
import AuthProvider from "../context/AuthProvider";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupThunk } from "../redux/slice/userSlice";
import PropType from 'prop-types'
function Signup({ role,handleModal}) {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

    role: Yup.string()
      .oneOf([STUDENT, TEACHER], "Role must be either 'admin' or 'user'")
      .required("Role is required"),
  });
   const [state,setState]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
   })
  const  handleInputData=(e)=>{
     const {name,value} = e.target;

     setState({...state,
        [name]:value
     })
   }
   const [modal,setModal] = useState("");
    handleModal(modal)
   const [errors,setErrors] = useState({});
   const dispatch = useDispatch();
   const handleFormSubmission = async(e)=>{
     e.preventDefault();

     const formData = {
        name:state.name,
        email:state.email,
        role:role,
        password:state.password,
        confirmPassword: state.confirmPassword
     }
     try {
        await schema.validate(formData,{
            abortEarly:false
        })
        const res = await dispatch(signupThunk(formData))
        if(res.payload.statusCode===200){
        setModal("Login")
        }
     } catch (err) {
        const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
     }
     

   }
  return (
    <div className=" p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {role === STUDENT ? "Sign up as Learner" : "Sign up as Teacher"}
      </h2>
      <form 
      onSubmit={handleFormSubmission}
      className="flex flex-col gap-2 ">
        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-3 items-center">
            {signupData.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <label
                  htmlFor={item.name}
                  className="text-sm font-medium text-gray-600"
                >
                  {item.label}
                </label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder={`Enter ${item.name} here..`}
                  id={item.name}
                  name={item.name}
                  type={item.type}
                  onChange={handleInputData}
                ></input>
                  {errors[item.name] && (
                  <span className="text-red-500 text-sm">{errors[item.name]}</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 items-center">
            {signupData.slice(2, 4).map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <label
                  htmlFor={item.name}
                  className="text-sm font-medium text-gray-600"
                >
                  {item.label}
                </label>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                  placeholder={`Enter ${item.name} here..`}
                  id={item.name}
                  name={item.name}
                  type={item.type}
                  onChange={handleInputData}

                ></input>
                  {errors[item.name] && (
                  <span className="text-red-500 text-sm">{errors[item.name]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-3 px-4 bg-[#007bff] text-white rounded-md shadow-lg hover:bg-[#0056b3] transition-all duration-300"
        >
          Submit
        </button>
        <p className=" text-center "> or sign up with </p>
        
      </form>
      <div>
        <AuthProvider role={role}/>
      </div>
      {/* signup with google */}
    </div>
  );
}

Signup.propTypes = {
  role:PropType.string.isRequired,
  handleModal: PropType.func
}

export default Signup;
