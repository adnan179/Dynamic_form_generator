"use client";
import { FormSchema } from "@/types/schema";
import React from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "./context/ThemeContext";

interface FormPreviewProps {
  schema: FormSchema|null;
}

const FormPreview:React.FC<FormPreviewProps> = ({schema}) => {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const {isDarkMode} = useTheme();

  if(!schema){
    return(
      <div className="w-full md:w-1/2 p-4">
        <h2 className={`${isDarkMode ? "text-white":"text-black"} text-xl font-bold mb-4`}>Form Preview</h2>
        <p className="text-gray-500 font-semibold">No valid schema available.Please provide a valid schema</p>
      </div>
    );
  }

  //function to submit the form and console log the form data
  const onSubmit = (data:any) => {
    console.log("Form Submitted",data);
    alert("Form submitted successfully");
  }

  //function to copy the code for the form being renderd
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
      .then(() => alert("Form code copied to clipboard!"))
      .catch(() => alert("Failed to copy form code."));
  };

  return (
    <div className="w-full md:w-2/5 p-4">
      <div className="flex flex-row w-full justify-between items-center">
        <h1 className={`${isDarkMode ? "text-white":"text-black"} text-xl font-bold mb-4`}>Form Preview</h1>
        <button type="button" onClick={handleCopyCode} className="bg-transparent text-gray-600 border border-gray-600 px-4 py-2 rounded-lg font-medium ">
          Copy code!
        </button>
      </div>
      <h2 className={`${isDarkMode ? "text-white":"text-black"} text-xl font-bold mb-4`}>{schema.formTitle}</h2>
      {schema.formDescription && <p className="text-gray-600 mb-4">{schema.formDescription}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema && schema.fields.map((field) => {
          return(
            <div key={field.id} className="flex flex-col">
              <label htmlFor={field.id} className={`${isDarkMode?"text-gray-200":"text-gray-900"} font-semibold`}>{field.label}</label>
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
                  minLength: field.validation?.minLength,
                  maxLength: field.validation?.maxLength,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                  min: field.validation?.min,
                  max: field.validation?.max,
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
    </div>
  )
}

export default FormPreview;