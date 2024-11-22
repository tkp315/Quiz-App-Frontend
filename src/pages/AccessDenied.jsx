
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the homepage or any desired route
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <p className="text-2xl text-gray-800 mb-6">Access Denied</p>
      <p className="text-lg text-gray-600 mb-8 text-center">
        You do not have permission to view this page.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default AccessDenied;
