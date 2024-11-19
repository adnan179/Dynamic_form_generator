"use client";
import { FormSchema } from "@/types/schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "./context/ThemeContext";

interface FormPreviewProps {
  schema: FormSchema|null;
}

const FormPreview:React.FC<FormPreviewProps> = ({schema}) => {
  const {register, handleSubmit, formState:{errors,isValid},watch} = useForm({
    mode:"onChange",
  });
  const {isDarkMode} = useTheme();
  const [isCopied, setIsCopied] = useState<string>("");
  const [JsonCopy,setJsonCopy] = useState<string>("");

  //function to submit the form and console log the form data
  const onSubmit = (data:object) => {
    const result = JSON.stringify(data,null,2);
    console.log("Form Submitted",result);
    alert("Form submitted successfully");
  }

  //function to copy the code for the form being rendered
  const handleCopyCode = () => {
    const generatedCode = `
      <form>
        ${schema.fields.map((field) => {
          if (field.type === "text" || field.type === "email") {
            return `<input type="${field.type}" id="${field.id}" placeholder="${field.placeholder}" className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#EC5990]"/>`;
          }
          if (field.type === "textarea") {
            return `<textarea id="${field.id}" placeholder="${field.placeholder} className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#EC5990]""/>`;
          }
          if (field.type === "file") {
            return `<input type="file" id="${field.id}" className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#EC5990]"/>`;
          }
          if (field.type === "select" && field.options) {
            return `
              <select id="${field.id} className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#EC5990]"">
                ${field.options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
              </select>
            `;
          }
          return "";
        }).join("\n")}
      </form>
    `;

    navigator.clipboard.writeText(generatedCode)
      .then(() => setIsCopied("Copied!"))
      .catch(() => setIsCopied("Failed to copy!"));
    setTimeout(() => setIsCopied(""),2000);
  };

  //function to copy the form data in the json format
  const handleCopyJSON = () => {
    const formData = watch();
    const jsonString = JSON.stringify(formData,null,2);
    navigator.clipboard.writeText(jsonString)
      .then(() => setJsonCopy("Copied!"))
      .catch(() => setJsonCopy("Failed to copy!"));
    setTimeout(() => setJsonCopy(""),2000);
  };

  //function to download the JSON format of the form data
  const handleDownloadJSON = () => {
    const formData = watch();
    const blob = new Blob([JSON.stringify(formData,null,2)],{type:"application/json"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    // Check if schema is not null before accessing its properties
    if (schema) {
      link.download = `${schema.formTitle || "form"}.json`;
    }
    link.click();
  };

  //component when the schema is not valid or null
  if(!schema){
    return(
      <div id="null-schema-component" className="w-full md:w-1/2 p-4">
        <h2 className={`${isDarkMode ? "text-white":"text-black"} text-xl font-bold mb-4`}>Form Preview</h2>
        <p className="text-gray-500 font-semibold">No valid schema available.Please provide a valid schema</p>
      </div>
    );
  }
  return (
    <div className="w-full md:w-2/5 p-4">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className={`${isDarkMode ? "text-white":"text-black"} text-xl font-bold mb-4`}>Form Preview</h1>
        <button type="button" onClick={handleCopyCode} className="bg-transparent text-gray-600 border border-gray-600 px-4 py-2 rounded-lg font-medium ">
          {isCopied ? isCopied : "Copy code!"}
        </button>
      </div>
      <h2 className={`${isDarkMode ? "text-white":"text-black"} text-xl font-bold mb-4`}>{schema.formTitle}</h2>
      {schema.formDescription && <p className="text-gray-600 mb-4">{schema.formDescription}</p>}
      <form id="form-preview" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema && schema.fields.map((field) => {
          return(
            <div key={field.id} className="flex flex-col">
              <label id={field.id} htmlFor={field.id} className={`${isDarkMode?"text-gray-200":"text-gray-900"} font-semibold`}>{field.label}</label>
              {field.type === 'text' || field.type === 'email' ||field.type === 'password' || field.type==="number"? (
                <input id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className={`
                  border rounded-lg p-2 
                  focus:outline-none focus:ring-2  
                  ${isDarkMode ? "bg-gray-800 border-gray-600 text-white focus:ring-gray-100" : "bg-white border-gray-300 text-black focus:ring-gray-900"}
                ${errors[field.id] ? "border-red-500" : "border-gray-300"}`}
                {...register(field.id, { 
                  required: field.required,
                  minLength: field.validation?.minLength ? field.validation.minLength : undefined,
                  maxLength: field.validation?.maxLength !== undefined ? field.validation.maxLength : undefined,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                  min: field.validation?.min !== undefined ? field.validation.min : undefined,
                  max: field.validation?.max !== undefined ? field.validation.max : undefined,
                })}/>
              ):null}
              {field.type === 'textarea' ? (
                <textarea
                rows={5}
                  id={field.id}
                  placeholder={field.placeholder}
                  className={`
                    border rounded-lg p-2 
                    focus:outline-none focus:ring-2 
                    ${isDarkMode ? "bg-gray-800 border-gray-600 text-white focus:ring-gray-100" : "bg-white border-gray-300 text-black focus:ring-gray-900"}
                  ${errors[field.id] ? "border-red-500" : "border-gray-300"}`}
                  {...register(field.id, {
                    required: field.required
                  })}
                />
              ) : null}
              {field.type === 'file' ? (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  className={`
                    border rounded-lg p-2
                    focus:outline-none focus:ring-2 
                    ${isDarkMode ? "bg-gray-800 border-gray-600 text-white focus:ring-gray-100" : "bg-white border-gray-300 text-black focus:ring-gray-900"}
                  ${errors[field.id] ? "border-red-500" : "border-gray-300"}`}
                  {...register(field.id, {
                    required: field.required
                  })}
                />
              ) : null}
              {field.type === 'date' ? (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  className={`
                    border rounded-lg p-2
                    focus:outline-none focus:ring-2 
                    ${isDarkMode ? "bg-gray-800 border-gray-600 text-white focus:ring-gray-100" : "bg-white border-gray-300 text-black focus:ring-gray-900"}
                  ${errors[field.id] ? "border-red-500" : "border-gray-300"}`}
                  {...register(field.id, {
                    required: field.required
                  })}
                />
              ) : null}
              {field.type === 'checkbox' ? (
                <div className="mt-2">
                  {field.options ? (field.options?.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${field.id}-${option.value}`}
                        value={option.value}
                        className="border rounded-lg p-2 w-4 h-4 mr-2 "
                        {...register(field.id, {required: field.required})}
                      />
                      <label htmlFor={`${field.id}-${option.value}`} className={`text-sm ${isDarkMode?"text-white":"text-black"}`}>
                        {option.label}
                      </label>
                    </div>
                  ))):(
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={field.id}
                        className="border rounded-lg p-2 w-4 h-4 mr-2 "
                        {...register(field.id, {required: field.required})}
                      />
                      <label htmlFor={field.id} className={`text-sm ${isDarkMode?"text-white":"text-black"}`}>
                        {field.label}
                      </label>
                    </div>
                  )}
                </div>
              ): null}
              {field.type === "radio" ? (
              <div className="flex flex-col space-y-2">
                {field.options?.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      value={option.value}
                      id={field.id}
                      className="mr-2"
                      {...register(field.id, { required: field.required })}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : null}
              {field.type === 'select' && field.options ? (
                <select id={field.id}
                {...register(field.id,{required: field.required})} 
                className={`
                  border rounded-lg p-2 
                  focus:outline-none focus:ring-2 
                  ${isDarkMode ? "bg-gray-800 border-gray-600 text-white focus:ring-gray-100" : "bg-white border-gray-300 text-black focus:ring-gray-900"}
                `}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ):null}
              {errors[field.id] && (
                <span className="text-red-500">{field.validation?.message || "this field is required "}</span>
              )}
            </div>
          )
        })}
        <button type="submit" className="bg-transparent px-4 py-2 rounded-lg font-medium text-gray-600 border border-gray-600 hover:scale-110 transition duration-300 ease-linear">Submit</button>
      </form>
      <div className="flex flex-row gap-2">
        <button onClick={handleDownloadJSON} disabled={!isValid}
          className={`mt-2 px-4 py-2 rounded-lg font-medium ${isValid ? "bg-gray-900 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          title={!isValid ? "Fill all required fields" : ""}
        >Download JSON</button>
        <button onClick={handleCopyJSON}
      disabled={!isValid}
      className={`mt-2 px-4 py-2 rounded-lg font-medium ${isValid ? "bg-gray-900 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
        title={!isValid ? "Fill all required fields" : ""}
      >{JsonCopy ? JsonCopy:"Copy JSON"}</button>
      </div>
      
    </div>
  )
}

export default FormPreview;