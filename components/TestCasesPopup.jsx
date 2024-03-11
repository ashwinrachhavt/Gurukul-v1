// components/TestCasesPopup.js
import React, { useState, useEffect } from 'react';
import { initSupabase, fetchTestCasesById } from '../utils/supabaseUtils';

const TestCasesPopup = ({ problemId }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Changed testCases to an empty string to align with your update
  const [testCases, setTestCases] = useState("");

  useEffect(() => {
    const fetchTestCases = async () => {
      const supabase = initSupabase();
      try {
        const data = await fetchTestCasesById(supabase, 'LCDB', parseInt(problemId));
        if (data && data.length > 0) {
          // Assuming your test cases are stored as a string under the 'Actual_Test_Cases' column
          // No need for JSON.parse if it's a simple string with delimiters
          setTestCases(data[0].Actual_Test_Cases);
        }
      } catch (error) {
        console.error('Error fetching test cases:', error);
      }
    };

    if (problemId) {
      fetchTestCases();
    }
  }, [problemId]);

  // Inline styles
  const styles = {
    button: {
      cursor: 'pointer',
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
    },
    content: {
      marginTop: '10px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
  };

  // Splitting the testCases string into an array for mapping
  const testCaseArray = testCases.split('\n').filter(tc => tc.trim() !== ""); // Split by newline and filter out any empty lines

  return (
    <div className="test-cases-popup-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.button}
        className="toggle-popup-btn"
      >
          {isOpen ? 'Hide Test Cases' : 'Show Test Cases'}

      </button>

      {isOpen && (
        <div className="test-cases-content" style={styles.content}>
          <h3>Use Print Statements in Your Language to Run these Test Cases</h3>
          <ul>
            {testCaseArray.map((testCase, index) => (
              <li key={index}>{testCase}</li> // Mapping over the array of test cases
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestCasesPopup;
