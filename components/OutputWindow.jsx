import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      //compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      //accepted
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails?.stdout) !== null
            ? atob(outputDetails?.stdout)
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      //TLE
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          Time Limit Exceeded!
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <h1 className="text-3xl font-bold">Output</h1>
      <div 
        style={{
          width: '700px',
          height: '110px',
          backgroundColor: '#2D3748', // This is the hexadecimal code for dark blue
          color: 'white',
          fontSize: 'small',
          overflowY: 'auto',
          borderRadius: '5px', // Optional: To have rounded corners
          padding: '10px' // Optional: To have some spacing inside the textarea
        }}
      >
         {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};
export default OutputWindow;