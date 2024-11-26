import Card from "../components/Card";
import login from "../assets/login.jpeg";
import { useState } from "react";
import { STUDENT, TEACHER } from "../helpers/constants";
import Signup from "./Signup";
import Login from "./Login";
function Auth() {
  const [currView, setCurrView] = useState(null);

  const handleClick = (view) => {
    setCurrView(view);
  };
  return (
    <div className=" flex px-10 py-4 m-10 shadow-md bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white border-b-2  border-slate-200 rounded-md flex-row   items-center justify-between relative ">
      {/* logo */}

      {/* para */}
      <div className=" flex flex-col ">
        <div>
          <h1 className="text-3xl font-bold font-mono text-[#007bff]  tracking-wide absolute top-5">
            Quizz
          </h1>
        </div>
        
        <div className="flex flex-row mt-10 ">
          <Card 
          text="Sign up as teacher" 
          icon="FaUserTie"
           iconType="fa"
           btnName="Teacher"
           isSelected={currView==='Teacher'}

           onClick={handleClick} />
          <Card
            text="Sign up as learner"
            icon="PiStudentDuotone"
            iconType="pi"
            btnName="Student"
            isSelected={currView==='Student'}
            onClick={handleClick} 
          />
          <Card 
          text="Login" 
          icon="PiSignInThin" 
          iconType="pi" 
          btnName="Login"
          isSelected={currView==='Login'}

          onClick={handleClick} />
        
        </div>

        <div className="">
          {currView=== "Teacher" && <Signup role={TEACHER} />}
          {currView === "Student" && <Signup role={STUDENT} handleModal={handleClick} />}
          {currView === "Login" && <Login/>}
        </div>
      </div>


    

      <div className="w-1/2 flex justify-center">
        <img
          className="rounded-lg shadow-2xl w-[500px] h-auto object-cover"
          src={login}
          alt="Home Illustration"
        />
      </div>
    </div>
  );
}

export default Auth;
