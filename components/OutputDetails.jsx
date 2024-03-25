import React from "react";

const OutputDetails = ({ outputDetails, testResults }) => {
  return (
    <div className="mt-4 pl-2">
      <p className="text-lg my-2">
        Status: <span className="font-bold px-2 py-1 bg-gray-200 rounded-lg">{outputDetails?.status?.description}</span>
      </p>
      <p className="text-lg my-2">
        Memory: <span className="font-bold px-2 py-1 bg-gray-200 rounded-lg">{outputDetails?.memory}</span>
      </p>
      <p className="text-lg my-2">
        Time: <span className="font-bold px-2 py-1 bg-gray-200 rounded-lg">{outputDetails?.time}s</span>
      </p>
      {testResults && (
        <div className="test-results mt-4">
          <p className="text-lg my-2">
            Passed Test Cases: <span className="font-bold px-2 py-1 bg-purple-500 rounded-lg text-white">{testResults.passedTests}</span>
          </p>
          <p className="text-lg my-2">
            Total Test Cases: <span className="font-bold px-2 py-1 bg-gray-200 rounded-lg">{testResults.totalTests}</span>
          </p>
          <p className="text-lg my-2">
            Success Rate: <span className="font-bold px-2 py-1 bg-gray-200 rounded-lg">{testResults.successRate}</span>
          </p>
          {testResults.failedTestIndices.length > 0 && (
            <p className="text-lg my-2">
              Failed Test Cases: <span className="font-bold px-2 py-1 bg-red-500 rounded-lg text-white">{testResults.failedTestIndices.join(", ")}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OutputDetails;
