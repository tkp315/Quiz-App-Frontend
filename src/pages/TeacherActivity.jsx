import  { useState } from "react";
import TeacherQuestion from "../components/TeacherQuestion";
import TeacherQuizes from "../components/TeacherQuizes";

function TeacherActivity() {
  const [activeTab, setActiveTab] = useState("quizzes"); 

  return (

<div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Teacher Activity
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-3">
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === "quizzes"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setActiveTab("quizzes")}
        >
          My Quizzes
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === "questions"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setActiveTab("questions")}
        >
          My Questions
        </button>
      </div>

      {/* Active Section */}
      <div className="bg-white p-6 rounded-b-lg shadow-md">
        {activeTab === "quizzes" && <TeacherQuizes />}
        {activeTab === "questions" && <TeacherQuestion/>}
      </div>
    </div>
  );
}

export default TeacherActivity;
