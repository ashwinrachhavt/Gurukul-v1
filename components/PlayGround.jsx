'use client';

import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditor";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
import Chatbox from "../components/Chatbox"
import { useUser } from "@clerk/nextjs";
import { initSupabase, insertIntoTable, fetchTestCasesById, fetchStarterCode } from '../utils/supabaseUtils';
import { PythonDefault, pythonDefault } from "../utils/utilities";
import TestCasesPopup from './TestCasesPopup'; // Adjust the path as necessary


const Landing = ({ tags, difficulty, acceptance, id  })=> {
  const [code, setCode] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [stdout, setStdout] = useState("");
  const [testResults, setTestResults] = useState(null);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const [submissionData, setSubmissionData] = useState(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const supabase = initSupabase();

  const fileNameMapping = {
    python: 'Main.py',
    java: 'Main.java',
    go: 'Main.go',
    'c++': 'Main.cpp', // Make sure the key matches the value for C++ in languageOptions
    c: 'Main.c',
    javascript: 'Main.js',
  };
  

  const onSelectChange = async (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
    const { starterCode, error } = await fetchStarterCode(supabase, sl.value,  parseInt(id));
    if (error) {
      toast.error("Failed to fetch starter code");
      return;
    }
  
    setCode(starterCode);

  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleSubmit();
    }
  }, [ctrlPress, enterPress]);

  useEffect(() => {
    const fetchDefaultStarterCode = async () => {
      // This assumes `language` has already been set to Python as shown above
      if (!language) {
        console.error('Default language not set');
        return;
      }
  
      // Ensure `id` is correctly initialized and relevant for fetching starter code
      const { starterCode, error } = await fetchStarterCode(supabase, language.value, parseInt(id));
      if (error) {
        toast.error("Failed to fetch starter code for the default language");
        return;
      }
  
      setCode(starterCode);
    };
  
    fetchDefaultStarterCode();
    // If `id` is dynamic, include it in the dependency array
  }, [id]); // If `id` is static or not used, you can remove it from the dependency array
  

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const decodeBase64 = (encodedStr) => {
    return Buffer.from(encodedStr, 'base64').toString('ascii');
  };

  const handleSubmit = async () => {
    setCode(code);
    const codeToRun = code;
    const input = "";
    const fileName = fileNameMapping[language.value] || 'Main.txt';

    const options = {
      method : 'POST',
      url : process.env.NEXT_PUBLIC_ONECOMPILER_URL,
      headers : {
        'content-type' : 'application/json', 
        'X-RapidAPI-Key' : process.env.NEXT_PUBLIC_ONECOMPILER_KEY,
        'X-RapidAPI-Host' : process.env.NEXT_PUBLIC_ONECOMPILER_HOST,
      },
      data : {
        language : language.value, 
        stdin : input,
        files : [
          {
            name : fileName,
            content : codeToRun
          }
        ]
      }
    };

    const tableName = 'LCDB';

    let actualOutput = ''; // Declare actualOutput here

  try {
    const response = await axios.request(options);
    console.log(response);
    handleCompileResult(response.data);
    const submissionData = {
      clerk_user_id : user.id,
      submission_code: code,
      language: language.value,
      stdin: response.data.stdin,
      status: response.data.status,
      execution_time: response.data.executionTime,
      tags: tags,
      difficult: difficulty,
      acceptance: acceptance,
      submissionId: id, 
    }
    setSubmissionData(submissionData);

    actualOutput = response.data.stdout; // Assign value to actualOutput here
  } catch (error) {
    console.error("Error running code:", error);
    return;
  }

  try {
    const expectedOutputData = await fetchTestCasesById(supabase, tableName, parseInt(id));
    const expectedOutputs = expectedOutputData[0].Actual_Output; // Adjust according to your data structure
    const testResults = compareTestCases(actualOutput, expectedOutputs);
    //console.log(actualOutput);
    //console.log(expectedOutputs);
    //console.log(testResults);
    setTestResults(testResults);
    
  } catch (error) {
    console.error("Failed to fetch expected outputs:", error);
  }

  }

  const handleCompileResult = (result) => {
    // Check for successful compilation without errors
    if (result.status === "success" && !result.exception && result.stderr === null) {
      // Display a success toast with the output and execution time
      toast.success(`Compiled Successfully!\nOutput: ${result.stdout}\nExecution Time: ${result.executionTime}ms`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (result.status === "success" && (result.exception || result.stderr !== null)) {
      // Display an error toast with the error message
      toast.error(`Compilation Error:\n${result.exception || result.stderr}`, {
        position: "top-right",
        autoClose: false, // Keep the toast until closed manually for error messages
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Handle other statuses or unexpected results
      toast.info("Unexpected result from compilation.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  
  const handleSubmissionAndTestCases = async (submissionData, testCasesData) => {
    try {

      const submissionResponse = await supabase
      .from('submissionstable')
      .insert([{
        clerk_user_id: submissionData.clerk_user_id,
        submission_code: submissionData.submission_code,
        language: submissionData.language,
        stdin: submissionData.stdin,
        status: submissionData.status,
        execution_time: submissionData.execution_time,
        submissionId : id,
        tags: JSON.stringify(submissionData.tags), // Assuming tags is an array or object
        difficulty: submissionData.difficulty,
        acceptance: submissionData.acceptance,
        passed_tests: testCasesData.passedTests,
        total_tests: testCasesData.totalTests,
        failed_indices: JSON.stringify(testResults?.failedTestIndices.slice(0, -1)),
         // Assuming an array
      }]);

      if (submissionResponse.error) {
        console.error('Error storing submission:', submissionResponse.error);
        return { success: false, message: 'Error storing submission.' };
      }

      return { success: true, message: 'Successfully submitted to DB.' };
    } catch (error) {
      console.error('Submission error', error);
      return {success : false, message : 'Submission failed due to an error'};
    }
    
  
    
   
  };

  
  const handleSaveAndSubmit = async () => {
    await handleSubmissionAndTestCases(submissionData, testResults);

    toast.success("Successfully submitted to DB", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  };


  function compareTestCases(actual, expected) {
    // Function to safely parse JSON strings
    function safeParseJSON(jsonString) {
      try {
        return JSON.parse(jsonString);
      } catch (e) {

        if (jsonString.toLowerCase() === "true" || jsonString.toLowerCase() === "false") {
          return jsonString.toLowerCase();
        }
        return jsonString; // Return the original string if parsing fails
      }
    }
  
    // Helper function to deep compare two entities
    function deepEqual(a, b) {
      if (typeof a !== typeof b) return false;
      if (typeof a !== 'object' || a === null || b === null) return a === b;
  
      const keysA = Object.keys(a), keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
  
      for (const key of keysA) {
        if (!keysB.includes(key)) return false;
        if (!deepEqual(a[key], b[key])) return false;
      }
  
      return true;
    }
  
    // Parse and compare each test case
    const parsedActual = actual.split('\n').map(safeParseJSON);
    const parsedExpected = expected.split('\n').map(safeParseJSON);
  
    let passedTests = 0;
    const failedTestCases = [];

    parsedActual.forEach((actualValue, index) => {
      if (index < parsedExpected.length && deepEqual(actualValue, parsedExpected[index])) {
        passedTests++;
      } else {
        failedTestCases.push(index + 1);
      }
    });
  
    return {
      passedTests,
      totalTests: parsedExpected.length,
      successRate: `${(passedTests / parsedExpected.length * 100).toFixed(2)}%`,
      failedTestIndices: failedTestCases,
    };
  }
  



  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      let stdout = response.data.stdout;
      setStdout(response.data.stdout);

      console.log(stdout)

      /*
      status id = 1 => in queue
      status id = 2 => processing
      */
      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        //TO DO: HANDLE ALL STATUS IDS
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast("Compiled Successfully");
        console.log("response data", response.data);
        return;
      }
    } catch (err) {
      console.log("check status error", err);
      setProcessing(false);
      showErrorToast("Something went wrong! Please try again later.");
    }
  };


  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />


      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 overflow-hidden"></div>
      <div className="flex flex-row overflow-y-hidden">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        
      </div>

      <div className="flex flex-row space-x-4 items-start px-4 py-4 overflow-x-hidden overflow-y-auto">
      {/* <div className="flex flex-row space-x-4 items-start px-4 py-4 overflow--hidden"> */}

        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>



        <div className="right-container flex flex-grow-1 w-[50%] flex-col">
        {/* <TestCasesPopup problemId={id} /> */}
        
         {/* Add this line where you want the popup to appear, assuming 'id' is the problem ID */}
        <div style={{ height: '50px' }}></div> {/* Adjust height as needed */}
        <OutputWindow testResults={testResults} />

          <div className="flex flex-col items-end">

          <button
            onClick={handleSubmit}
            disabled={!code}
            className={classnames(
              "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-background flex-shrink-0",
              !code ? "opacity-50" : ""
            )}
          >
            {processing ? "Processing..." : "Compile and Execute"}
          </button>
          <div className="flex flex-col items-end mb-4 p-5">
      <button
        onClick={handleSaveAndSubmit}
        className="mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-background flex-shrink-0"
          >
            Save and Submit
          </button>
          <br></br>
          <Chatbox userId={user?.id} />


        </div>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}

          {testResults && (
          <div className="mt-4">
          <h3>Test Results:</h3>
          {testResults.passedTests > 0 ? (
            <>
              <p>Success Rate: {testResults.successRate}</p>
              <p>Passed Test Cases: {testResults.passedTestCases}</p>
              <p>Failed Test Cases: {testResults.failedTestIndices.slice(0, -1).join(", ")}</p>
            </>
          ) : (
            <div className="text-red-500">
              <p>None of the test cases passed. Please review your code!</p>
            </div>
          )}
        </div>
      )}
        </div>
      </div>
    </>
  );
};


export default Landing;