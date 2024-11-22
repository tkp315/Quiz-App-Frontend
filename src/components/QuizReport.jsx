
import PropType from 'prop-types'
const QuizReport = ({ report, duration }) => {
  const {
    score,
    correct,
    wrong,
    skipped,
    totalAnswered,
    timeRemaining,
    suggestion,
    totalMarks
  } = report;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  // Convert duration and timeRemaining to seconds
  const durationInSeconds = duration * 60;
  const timeSpentInSeconds = durationInSeconds - timeRemaining;

  return (
    <div className="bg-gradient-to-r from-white via-[#f9f7f4] to-[#ece3da] min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full min-h-screen overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quiz Report</h1>
          <p className="text-gray-600">Your performance summary</p>
        </div>

        {/* Score Section */}
        <div className="flex justify-center items-center mb-6">
          <div className="text-center">
            <p className="text-lg text-gray-500">Your Score</p>
            <h2 className="text-4xl font-bold text-blue-600">{score}</h2>
            <p className="text-sm text-gray-400">out of {totalMarks}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 text-center mb-6">
          <div className="p-4 bg-blue-50 rounded-lg shadow">
            <p className="text-sm text-gray-500">Correct Answers</p>
            <p className="text-xl font-semibold text-green-600">
              {correct || report.correctAnswers||0}
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg shadow">
            <p className="text-sm text-gray-500">Wrong Answers</p>
            <p className="text-xl font-semibold text-red-600">
              {wrong || report.incorrectAnswers}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg shadow">
            <p className="text-sm text-gray-500">Skipped Questions</p>
            <p className="text-xl font-semibold text-yellow-600">{skipped}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <p className="text-sm text-gray-500">Total Answered</p>
            <p className="text-xl font-semibold text-gray-800">
              {totalAnswered}
            </p>
          </div>
        </div>

        {/* Time Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Time Remaining</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatTime(timeRemaining)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed In</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatTime(timeSpentInSeconds)}
              </p>
            </div>
          </div>
        </div>

        {/* Suggestion Section */}
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <p className="text-sm text-gray-500">Suggestion</p>
          <p className="text-lg font-semibold text-blue-700">{suggestion || report.suggestions[0]}</p>
        </div>
      </div>
    </div>
  );
};

QuizReport.propTypes = {
  report:PropType.object,
  duration:PropType.number
}

export default QuizReport;
