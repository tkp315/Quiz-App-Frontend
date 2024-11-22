import Navbar from "../layouts/Navbar";
import { FaTrophy } from "react-icons/fa6";
import home from "../assets/home1.jpeg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const { auth} = useSelector((state) => state);
  const {user,isLoggedIn} = auth;
  console.log(user)
  console.log(isLoggedIn)
  return (
    <Navbar>
      <div className="bg-gradient-to-br from-[#f9f7f4] to-[#ece3da] min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="flex flex-row gap-4 justify-center items-center p-6 shadow-lg bg-white">
          <h1 className="font-extrabold text-5xl text-[#333] tracking-wide">
            Play Quiz
          </h1>
          <FaTrophy className="text-6xl text-yellow-500 animate-bounce" />
        </div>

        {/* Main Content */}
        <div className="flex flex-row justify-between items-center p-10 mx-16 mt-8 gap-8">
          {/* Left Content */}
          <div className="w-1/2">
            <h2 className="text-3xl font-bold text-[#555] mb-6">
              Are you ready to test your knowledge?
            </h2>
            <p className="text-lg text-[#777] mb-8 leading-relaxed">
              Challenge yourself with our engaging quizzes, boost your knowledge, and compete
              with your friends. Unlock your potential and become a QuizMaster today!
            </p>
            <div className="flex gap-4">
              <Link to='/quizzes'>
              <button className="px-6 py-3 bg-[#007bff] text-white font-semibold rounded-lg shadow-md hover:bg-[#0056b3] transition-all duration-300">
                Start Quiz
              </button>
              </Link>
            {
              !isLoggedIn?(<Link to='/login'>
                <button className="px-6 py-3 bg-[#f0f0f0] text-[#333] font-semibold rounded-lg shadow-md hover:bg-[#e0e0e0] transition-all duration-300">
                    Login
                  </button>
                </Link>):("")
            }
            </div>
          </div>

          {/* Right Content */}
          <div className="w-1/2 flex justify-center">
            <img
              className="rounded-lg shadow-2xl w-[500px] h-auto object-cover"
              src={home}
              alt="Home Illustration"
            />
          </div>
        </div>

    
      
      </div>
    </Navbar>
  );
}

export default Home;
