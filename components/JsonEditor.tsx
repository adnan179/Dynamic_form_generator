import React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "./context/ThemeContext";

interface JSONEditorProps {
  jsonSchema: string;
  onChange: (value: string) => void;
  error: string | null;
}

const JsonEditor: React.FC<JSONEditorProps> = ({
  jsonSchema,
  onChange,
  error,
}) => {
  const {isDarkMode} = useTheme();

  return (
    <div className={`w-full md:w-1/2 p-4 bg-transparent rounded-lg
    ${isDarkMode?"text-white  border border-gray-200":"text-black border-gray-950 border"}`}>
      <h2 className="text-xl font-bold mb-4">JSON Editor</h2>
      <Editor
        height="70vh"
        language="json"
        theme={isDarkMode ? "vs-dark" :"vs-light"}
        value={jsonSchema}
        onChange={(value) => onChange(value || "")}
        className="drop-shadow-lg rounded-[36px]"
      />
      {error && <p className="text-red-500 font-medium text-[10px] mt-2">{error}</p>}
    </div>
  );
};

export default JsonEditor;
