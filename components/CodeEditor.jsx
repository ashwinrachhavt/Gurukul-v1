import Editor from "@monaco-editor/react";
import React, { useState } from "react";
const CodeEditor = ({ onChange, language, code, theme,action }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(action, value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="//write your code here"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditor;

// import React, { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";

// const CodeEditor = ({ onChange, language, code, theme, action }) => {
//   const [value, setValue] = useState(code || "");

//   // Update the internal state whenever the code prop changes
//   useEffect(() => {
//     setValue(code);
//   }, [code]);

//   const handleEditorChange = (value) => {
//     setValue(value);
//     onChange(action, value);
//   };

//   return (
//     <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
//       <Editor
//         height="85vh"
//         width={`100%`}
//         language={language || "javascript"}
//         value={value}
//         theme={theme}
//         defaultValue="//write your code here"
//         onChange={handleEditorChange}
//       />
//     </div>
//   );
// };

// export default CodeEditor;
