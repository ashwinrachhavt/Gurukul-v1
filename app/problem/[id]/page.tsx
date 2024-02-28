// app/problem/[id]/page.tsx
"use client";
import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/navigation'
import {UserButton} from "@clerk/nextjs"
import { currentUser } from '@clerk/nextjs';
import { initSupabase, fetchProblemById } from '../../../utils/supabaseUtils';

import { usePathname, useSearchParams } from 'next/navigation';
import { Sandpack, SandpackProvider, SandpackCodeEditor, SandpackThemeProvider } from "@codesandbox/sandpack-react";
import Editor from "../../../components/NewCodeEditor";
import Landing from "../../../components/PlayGround";

// Define an interface for the problem data
interface Problem {
  Title: string;
  Problem_Description: string;
  Test_Cases: string;
  Hints_1: string;
  Hint_2: string;
  Hint_3: string;
  Tags: string;
  Difficulty: string;
  Acceptance: Float32Array;
}



const ProblemDetail = () => {
  // const router = useRouter()
  // const { id } = router.query.idTest_Cases
  const pathname = usePathname();
  // Use the as operator to assert the type of id
  const id = pathname.split('/').pop() as string;
  // const [searchParams] = useSearchParams();
  // console.log(searchParams)
  // Use the useState hook with a generic type argument
  const [problem, setProblem] = useState<Problem | null>(null);
  const [showHints, setShowHints] = useState<boolean>(false);
  // Use an object type literal for debugInfo
  const [debugInfo, setDebugInfo] = useState<{[key: string]: any}>({});
  // Use a union type for showHint
  const [showHint, setShowHint] = useState<null | number>(null);
  
  const [lastUnlockedHint, setLastUnlockedHint] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleHintClick = (hintNumber: number) => {
    setLastUnlockedHint(Math.max(lastUnlockedHint, hintNumber));
  };
  
  // useEffect(() => {
  //   if (id) {
  //     setDebugInfo(prev => ({ ...prev, id }));
  //     setDebugInfo(prev => ({ ...prev, fetchStatus: 'Fetching problem details...' }));

  //     fetch(`https://x8ki-letl-twmt.n7.xano.io/api:m3qoN9RM/lcdb/${id}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         // Use type assertion for data
  //         setProblem(data as Problem);
  //         setDebugInfo(prev => ({ ...prev, fetchedData: data }));
  //       })
  //       .catch(error => {
  //         console.error("Failed to fetch problem:", error);
  //         setDebugInfo(prev => ({ ...prev, fetchError: error.message }));
  //       });
  //   }
  // }, [id]);

  useEffect(() => {
    const fetchProblem = async () => {
      const supabase = initSupabase();
      const tableName = 'LCDB';
 
      try {
        const data = await fetchProblemById(supabase, tableName, id);
        setProblem(data[0]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch problem:", error);
      }
    };
 
    fetchProblem();
  }, [id]);

  if (!problem) {
    return (
      <div>
        <p>Loading...</p>
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    );
  }

  // Use an object type literal for initialCode
  const initialCode = {
    "/index.js": `// Try solving the problem: ${problem ? problem.Title : ''}
      
function solve() {
  // Your code here
}`
  };

  return (
    <>
      <div className="problem-container p-6 bg-background shadow-lg rounded-lg mx-4 my-6">
      <h1 className="problem-title text-2xl font-bold mb-4">{problem.Title}</h1>
      <p className="problem-description text-black-700 mb-4">{problem.Problem_Description}</p>
      <p className="test-cases text-black-600 mb-4">{problem.Test_Cases}</p>
      <p className="test-cases text-black-600 mb-4">Tags - {problem.Tags}</p>


      <div className="hints-section mb-4">
          <button 
            className={`hint-toggle-btn mr-2 px-4 py-2 rounded ${lastUnlockedHint >= 1 ? 'bg-blue-500 text-white' : 'bg-background-300 text-gray-500 cursor-not-allowed'}`}
            onClick={() => handleHintClick(1)}
          >
            Hint 1
          </button>
          <button 
            className={`hint-toggle-btn mr-2 px-4 py-2 rounded ${lastUnlockedHint >= 2 ? 'bg-blue-500 text-white' : 'bg-background-300 text-gray-500 cursor-not-allowed'}`} 
            onClick={() => handleHintClick(2)}
            disabled={lastUnlockedHint < 1}
          >
            Hint 2
          </button>
          <button 
            className={`hint-toggle-btn px-4 py-2 rounded ${lastUnlockedHint >= 3 ? 'bg-blue-500 text-white' : 'bg-background-300 text-gray-500 cursor-not-allowed'}`} 
            onClick={() => handleHintClick(3)}
            disabled={lastUnlockedHint < 2}
          >
            Hint 3
          </button>
        </div>
      
      
        {lastUnlockedHint >= 1 && <div className="hint bg-background-100 p-4 rounded mb-4">{problem.Hints_1}</div>}
        {lastUnlockedHint >= 2 && <div className="hint bg-background-100 p-4 rounded mb-4">{problem.Hint_2}</div>}
        {lastUnlockedHint >= 3 && <div className="hint bg-background-100 p-4 rounded mb-4">{problem.Hint_3}</div>}
      <div className="editor-section mb-4">
      <Landing tags={problem.Tags} difficulty={problem.Difficulty} acceptance={problem.Acceptance} id = {problem.id} />
      </div>

    </div>
    </>

  );
};

export default ProblemDetail;
