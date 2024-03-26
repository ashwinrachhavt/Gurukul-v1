import React from "react";

const OutputWindow = ({ testResults }) => {
  // Check if there are testResults to display
  const hasResults = testResults && (testResults.passedTests !== undefined || testResults.failedTestIndices?.length > 0);

  return (
    <div className="output-window-container">
      <h1 className="text-xl font-bold text-white">Test Results</h1>
      <div className="output-window"
        style={{
          width: '700px',
          minHeight: '110px',
          backgroundColor: '#2D3748',
          color: 'white',
          fontSize: 'small',
          overflowY: 'auto',
          borderRadius: '5px',
          padding: '10px',
          marginTop: '10px',
        }}>
        {!hasResults && <p>Output Window</p>}
        {hasResults && (
          <>
            <p>Success Rate: {testResults.successRate}</p>
            <p>Passed Test Cases: {testResults.passedTests}</p>
            {testResults.failedTestIndices?.length > 0 && (
              <p>Failed Test Cases: {testResults.failedTestIndices.join(", ")}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OutputWindow;
