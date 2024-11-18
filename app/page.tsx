"use client";
import { useTheme } from "@/components/context/ThemeContext";
import FormPreview from "@/components/FormPreview";
import JsonEditor from "@/components/JsonEditor";
import Navbar from "@/components/Navbar";
import { FormSchema } from "@/types/schema";
import React, { useState } from "react";

const Home : React.FC = () =>{
  const {isDarkMode } = useTheme();
  const [jsonSchema, setJsonSchema] = useState<string>("");
  const [parsedSchema, setParsedSchema] = useState<FormSchema | null>(null);
  const [error,setError] = useState<string|null>(null);

  const handleJsonChange = (json:string) => {
    setJsonSchema(json);
    try{
      const parsed:FormSchema = JSON.parse(json);
      setParsedSchema(parsed);
      setError(null);
    }catch(e){
      setParsedSchema(null);
      setError("Invalid JSON format:"+e);
    }
  };
  return(
    <div className={`flex flex-col min-h-screen px-2 sm:px-8 ${isDarkMode ? "bg-[#040404]":"bg-white"}`} >
      <Navbar />
      <div className="flex flex-col md:flex-row mt-[70px] sm:mt-[80px]">
        <JsonEditor jsonSchema={jsonSchema} onChange={handleJsonChange} error={error}/>
        <FormPreview  schema={parsedSchema}/>
      </div>
    </div>
    
  )
}

export default Home;