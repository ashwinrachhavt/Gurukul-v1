import React, { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import { languageOptions } from "../constants/languageOptions";
import { defineTheme } from "../lib/defineTheme";
import LanguageDropdown from "../components/LanguageDropdown";
import ThemeDropdown from "../components/ThemeDropdown";
import OutputWindow from "../components/OutputWindow";
import CustomInput from "../components/CustomInput";
import OutputDetails from "../components/OutputDetails";
import Chatbox from "../components/Chatbox"


const NewCodeEditor = () => {
  const [code, setCode] = useState("//Write your code here");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [theme, setTheme] = useState({
    value: "cobalt",
    label: "Cobalt",
  });
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleThemeChange = (th) => {
    if (["light", "vs-dark"].includes(th.value)) {
      setTheme(th);
    } else {
      defineTheme(th.value).then(() => setTheme(th));
    }
  };

  const handleLanguageChange = (option) => {
    setLanguage(option);
  };

  const onCodeChange = (action, data) => {
    if (action === "code") {
      setCode(data);
    } else {
      console.warn("case not handled", action, data);
    }
  };

  useEffect(() => {
    defineTheme("oceanic-next").then(() => {
      setTheme({
        value: "oceanic-next",
        label: "Oceanic Next",
      });
    });
  }, []);

  return (
    <div className="flex flex-col w-full justify-start px-4 mt-4">
      {/* Language and Theme Dropdowns */}
      <div className="flex flex-row w-full justify-between md:justify-start mb-4">
        <div className="md:px-4 py-2 px-2 w-5/12 md:w-auto">
          <LanguageDropdown onSelectChange={handleLanguageChange} />
        </div>
        <div className="md:px-4 py-2 px-2 w-5/12 md:w-auto">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
  
      {/* Grid Container */}
      <div className="grid grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="p-4">
          <CodeEditor
            onChange={onCodeChange}
            language={language.value}
            theme={theme.value}
            code={code}
          />
        </div>
  
        {/* Nested Grid for Output and Samples */}
        <div className="grid grid-rows-2 gap-4 p-4">
          {/* Output Section */}
          <div>
            <OutputWindow outputDetails={outputDetails} />
            <div className="flex flex-col items-end mb-4 p-5">
              <Chatbox /> {/* Replaced CustomInput with ChatBox */}
            </div>
          </div>
  
          {/* Samples Section */}
          <div>

            <OutputDetails outputDetails={outputDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCodeEditor;
