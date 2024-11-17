"use client";
import { FormSchema } from "@/types/schema";
import React from "react";
import { useForm } from "react-hook-form";

interface FormPreviewProps {
  schema: FormSchema|null;
}

const FormPreview:React.FC<FormPreviewProps> = ({schema}) => {
  const {register, handleSubmit, formState:{errors}} = useForm();

  if(!schema){
    return(
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">Form Preview</h2>
        <p className="text-gray-500">No valid schema available.Please provide a valid schema</p>
      </div>
    );
  }

  const onSubmit = (data:any) => {
    console.log("Form Submitted",data);
    alert("Form submitted successfully");
  }

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-xl font-bold mb-4">{schema.formTitle}</h2>
      {schema.formDescription && <p className="text-gray-600 mb-4">{schema.formDescription}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields.map((field) => {
          return(
            <div key={field.id} className="flex flex-col">
              <label htmlFor={field.id} className="font-semibold">{field.label}</label>
              {field.type === 'text' || field.type === 'email' ? (
                <input id={field.id}
                type={field.type}
                placeholder={field.placholder}
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(field.id,{
                  required:field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined
                })}/>
              ):null}
              {field.type === 'textarea' ? (
                <textarea
                rows={5}
                  id={field.id}
                  placeholder={field.placeholder}
                  className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register(field.id, {
                    required: field.required
                  })}
                />
              ) : null}
              {field.type === 'select' && field.options ? (
                <select id={field.id}
                {...register(field.id,{required: field.required})} 
                className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ):null}
              {errors[field.id] && (
                <span className="text-red-500">{field.validation?.message || "this filed is required "}</span>
              )}
            </div>
          )
        })}
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">Submit</button>
      </form>
    </div>
  )
}

export default FormPreview;