"use client";
import FormPreview from "@/components/FormPreview";
import JsonEditor from "@/components/JsonEditor";
import { FormSchema } from "@/types/schema";
import React, { useState } from "react";

const Home : React.FC = () =>{
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
    <div className="flex flex-col md:flex-row h-screen">
      <JsonEditor jsonSchema={jsonSchema} onChange={handleJsonChange} error={error}/>
      <FormPreview  schema={parsedSchema}/>
    </div>
  )
}

export default Home;