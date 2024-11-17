import React from "react";

interface JSONEditorProps{
  jsonSchema:string;
  onChange:(value:string) => void;
  error:string|null;
};

const JsonEditor: React.FC<JSONEditorProps> = ({jsonSchema,onChange, error}) => {
  return(
    <div className="w-full md:w-1/2 p-4 border-r border-gray-300 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">JSON editor</h2>
      <textarea 
      className="w-full h-[70vh] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={jsonSchema}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste Your JSON schema here..."/>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default JsonEditor;