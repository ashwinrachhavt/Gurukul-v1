import React from "react";

const OutputWindow = ({ outputDetails, testResults, actualOutput }) => {
  const safeAtob = (str) => {
    try {
      return atob(str);
    } catch (e) {
      console.error('Decoding error:', e);
      return "Decoding error: The provided string could not be decoded.";
    }
  };

  const getOutput = () => {
    let statusId = outputDetails?.status?.id;
    switch (statusId) {
      case 6: // Compilation error
        return <pre className="text-xs text-red-500">{safeAtob(outputDetails?.compile_output)}</pre>;
      case 3: // Accepted
        return <pre className="text-xs text-green-500">{safeAtob(outputDetails?.stdout) || null}</pre>;
      case 5: // Time Limit Exceeded (TLE)
        return <pre className="text-xs text-red-500">Time Limit Exceeded!</pre>;
      default: // Other errors
        return <pre className="text-xs text-red-500">{safeAtob(outputDetails?.stderr)}</pre>;
    }
  };

  // Function to render actualOutput line by line
  const renderActualOutput = (output) => {
    // Decode the output (if it's Base64-encoded), split it into lines, and map each line to a <pre> tag
    const lines = safeAtob(output).split('\n');
    return lines.map((line, index) => (
      <pre key={index} className="text-xs">{line}</pre>
    ));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-white">Output</h1>
      <div
        style={{
          width: '700px',
          minHeight: '110px',
          backgroundColor: '#2D3748',
          color: 'white',
          fontSize: 'small',
          overflowY: 'auto',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        {outputDetails && <>{getOutput()}</>}
        {actualOutput && renderActualOutput(actualOutput)}
      </div>
    </>
  );
};

export default OutputWindow;
