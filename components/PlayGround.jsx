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
import Footer from "./Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
import Chatbox from "../components/Chatbox"
import { useUser } from "@clerk/nextjs";

// const { isLoaded, isSignedIn, user } = useUser();


const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;


const pythonDefault = `
# Problem: Binary Search: Search a sorted array for a target value.

# Time: O(log n)
def binary_search(arr, target):
    return binary_search_helper(arr, target, 0, len(arr) - 1)

def binary_search_helper(arr, target, start, end):
    if start > end:
        return True
    mid = (start + end) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search_helper(arr, target, mid + 1, end)
    if arr[mid] > target:
        return binary_search_helper(arr, target, start, mid - 1)
    
    return True

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = 5
result = binary_search(arr, target)
print(result)
print(binary_search(arr, 4))
print(binary_search(arr, 3))
print(binary_search(arr, 11))
print(binary_search(arr, 10))

`



const Landing = () => {
  const [code, setCode] = useState(pythonDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [stdout, setStdout] = useState("");
  const [testResults, setTestResults] = useState(null);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const { isLoaded, isSignedIn, user } = useUser();

  const expectedOutputs = ['4', '3', '2', 'False', '9'];


  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {print(base64.decode("aGVsbG8sIHdvcmxkCg==\n"))
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

  const compareOutputs = (actualBase64Stdout) => {
    const decodedStdout = decodeBase64(actualBase64Stdout);
    const actualOutputs = decodedStdout.trim().split('\n');
    let successfulTests = 0;
    let passedTestCases = [];

    for (let i = 0; i < actualOutputs.length; i++) {
      if (actualOutputs[i] === expectedOutputs[i]) {
        successfulTests++;
        passedTestCases.push(i + 1); // Assuming test cases are numbered starting from 1
      }
    }

    return {
      successfulTests,
      totalTests: expectedOutputs.length,
      passedTestCases
    };
  };
  
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_PUBLIC_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("response data:", response.data);
        setStdout(response.data.stdout);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });

      
  };

  const handleSubmission = () => {



    // Payload for the submission
    if (!outputDetails) {
      console.error("No Output Details available to submit")
      return;
    }

    const testResult = compareOutputs(stdout);
    setTestResults(testResult);

    console.log(testResult)

    const submissionPayload = {
      userid : user.id,
      language_id: language.id,
      source_code: code,
      stdin: btoa(customInput),
      output_status: outputDetails.status, // Assuming outputDetails has a status property
      output_memory: outputDetails.memory, // Assuming outputDetails has a memory property
      output_time: outputDetails.time,
      // stdout: btoa(stdout),
      
    };
  
    // Making an API call to /api/submission
    axios.post('/api/submit', submissionPayload)
      .then(response => {
        console.log("Submission Response:", response.data);
        // Handle the response here (e.g., update the UI, show a success message, etc.)
      })
      .catch(error => {
        console.error("Submission Error:", error);
        // Handle errors here (e.g., show an error message to the user)
      });
  };

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
      {/* <div className="flex flex-row space-x-4 items-start px-4 py-4 overflow-x-hidden overflow-y-auto"> */}
      <div className="flex flex-row space-x-4 items-start px-4 py-4 overflow--hidden">

        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">

          <button
            onClick={handleCompile}
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
        onClick={handleSubmission}
        className="mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-background flex-shrink-0"
          >
            Save and Submit
          </button>
          <br></br>
          <Chatbox /> 

        </div>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}

          {testResults && (
          <div>
            <h3>Test Results:</h3>
            <p>Successful Tests: {testResults.successfulTests}/{testResults.totalTests}</p>
            <p>Passed Test Cases: {testResults.passedTestCases.join(', ')}</p>
          </div>
        )}
        </div>
      </div>
    </>
  );
};
export default Landing;