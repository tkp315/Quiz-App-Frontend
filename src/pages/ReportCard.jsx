import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { reportThunk } from "../redux/slice/quizSlice";
import QuizReport from "../components/QuizReport";
import TheoryticalAnalysis from "../components/TheoryticalAnalysis";
import Navbar from "../layouts/Navbar";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

function ReportCard() {
  const [reports, setReports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState("quizReport");
  const dispatch = useDispatch();

  // Fetch all reports
  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await dispatch(reportThunk());
        if (res.payload?.data) {
          setReports(res.payload.data);
        }
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    }

    fetchReports();
  }, [dispatch]);

  // Close Modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedReport(null);
    setActiveTab("quizReport"); // Reset to default tab
  };

  return (
   <Navbar>
     <div className="min-h-screen bg-gradient-to-r from-[#eddabe] via-[#ece3da] to-white p-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
        Explore Reports
      </h1>
     <Link to='/quizzes'>
     <button className=" btn btn-secondary rounded-md mb-3">
        Go To Quiz <FaArrowAltCircleRight size={14}/>
      </button>
     </Link>
      {(isOpen && selectedReport )? 
      (
        <div className=" bg-opacity-50 flex flex-col gap-3 items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute btn btn-error top-2 right-2 text-white hover:text-gray-900 text-lg font-bold"
            >
              close
            </button>

            {/* Tabs */}
            <div className="flex justify-around border-b">
              <button
                onClick={() => setActiveTab("quizReport")}
                className={`py-2 px-4 w-full text-center font-semibold ${
                  activeTab === "quizReport"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Quantitative Analysis
              </button>
              <button
                onClick={() => setActiveTab("theoreticalAnalysis")}
                className={`py-2 px-4 w-full text-center font-semibold ${
                  activeTab === "theoreticalAnalysis"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Theoretical Analysis
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "quizReport" && (
                <QuizReport
                  report={selectedReport}
                  duration={selectedReport.quizId?.duration || 0}
                />
              )}
              {activeTab === "theoreticalAnalysis" && (
                <TheoryticalAnalysis report={selectedReport} />
              )}
            </div>
          </div>
        </div>
      ):
      (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {reports?.length > 0 ? (
          reports.map((report) => (
            <div
              key={report._id}
              className="p-4 bg-white shadow-xl rounded-lg border border-gray-300 hover:shadow-2xl transition duration-300"
            >
              {/* Report Image */}
              <img
                src={report.quizId?.quizImage || "https://via.placeholder.com/150"}
                alt={report.quizId?.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              {/* Report Details */}
              <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                {report.quizId?.title || "Untitled Quiz"}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                Total Questions: {report.quizId?.questions?.length || 0}
              </p>
              <p className="text-sm text-gray-500 font-semibold mb-4">
                Attempted: {new Date(report.createdAt).toLocaleString()}
              </p>

              {/* Action Buttons */}
              <button
                onClick={() => {
                  setIsOpen(true);
                  setSelectedReport(report);
                }}
                className="py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-green-600 transition"
              >
                See Result
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg col-span-full">
            No Reports Available
          </p>
        )}
      </div>
      )
    
    }
    
      
    </div>
   </Navbar>
  );
}

export default ReportCard;
