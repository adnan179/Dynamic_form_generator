import React from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "./context/ThemeContext";
import JsonSchemaExamples from "./JsonSchemaExamples";


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
    <div className={`w-full md:w-3/5 p-4 bg-transparent rounded-lg
    ${isDarkMode?"text-white border border-gray-200":"text-black border-gray-950 border"}`}>
      <div>
        <h2 className="text-xl font-bold mb-4">JSON Schema Examples:</h2>
        <JsonSchemaExamples />
      </div>
      <div className="mt-5">
        <h2 id="Json-editor-title" className="text-xl font-bold mb-4">JSON Editor</h2>
        <Editor className="monaco-editor"
          height="50vh"
          language="json"
          theme={isDarkMode ? "hc-black" :"vs-light"}
          value={jsonSchema}
          onChange={(value) => onChange(value || "")}
        />
        {error && <p id="editor-error-message" className="text-red-500 font-medium text-[10px] mt-2">{error}</p>}
      </div>
      
    </div>
  );
};

export default JsonEditor;
