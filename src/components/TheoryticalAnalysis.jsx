import PropType from 'prop-types'


function TheoryticalAnalysis({ report }) {
  const { myAnswers } = report;

  return (
    <div className="bg-gradient-to-r from-white via-[#f9f7f4] to-[#ece3da] min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full h-[80vh] overflow-y-auto">
        {myAnswers?.length > 0 ? (
          <div className="space-y-4">
            {myAnswers?.map((answer, index) => (
              <div
                key={answer.id}
                className={`p-4 rounded-lg shadow-md ${
                  answer.ans === answer.correctAns
                    ? "bg-green-50"
                    : "bg-red-50"
                }`}
              >
                <p className="text-gray-800 font-semibold">
                  Q{index + 1}: {answer.question}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Your Answer: </span>
                  <span
                    className={
                      answer.ans === answer.correctAns
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {answer.ans}
                  </span>
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Correct Answer: </span>
                  <span className="text-blue-600">{answer.correctAns}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {answer.ans === answer.correctAns
                    ? "✅ Your answer is correct!"
                    : "❌ Your answer is incorrect."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No answers to display.</p>
        )}
      </div>
    </div>
  );
}

TheoryticalAnalysis.propTypes = {
  report:PropType.object
}

export default TheoryticalAnalysis;
