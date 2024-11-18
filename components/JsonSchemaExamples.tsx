import React, { useState } from "react";
import { useTheme } from "./context/ThemeContext";

const Examples = [
  {
    formTitle: "User Registration Form",
    formDescription: "Create your account by filling out this form.",
    fields: [
      {
        id: "username",
        type: "text",
        label: "Username",
        required: true,
        placeholder: "Enter your username",
        validation: {
          minLength: 3,
          maxLength: 15,
          message: "Username must be between 3 and 15 characters.",
        },
      },
      {
        id: "password",
        type: "password",
        label: "Password",
        required: true,
        placeholder: "Enter your password",
        validation: {
          minLength: 8,
          message: "Password must be at least 8 characters.",
        },
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address.",
        },
      },
      {
        id: "age",
        type: "number",
        label: "Age",
        required: true,
        placeholder: "Enter your age",
        validation: {
          min: 18,
          message: "You must be at least 18 years old.",
        },
      },
    ],
  },
  {
    formTitle: "Feedback Form",
    formDescription: "We value your feedback. Please fill out this form.",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Name",
        required: true,
        placeholder: "Enter your name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address.",
        },
      },
      {
        id: "rating",
        type: "number",
        label: "Rating (1-5)",
        required: true,
        placeholder: "Rate between 1 to 5",
        validation: {
          min: 1,
          max: 5,
          message: "Rating must be between 1 and 5.",
        },
      },
      {
        id: "comments",
        type: "textarea",
        label: "Comments",
        required: false,
        placeholder: "Enter your comments",
        validation: {
          maxLength: 500,
          message: "Comments cannot exceed 500 characters.",
        },
      },
    ],
  },
  {
    formTitle: "Event Registration Form",
    formDescription: "Register for the upcoming event.",
    fields: [
      {
        id: "fullName",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address.",
        },
      },
      {
        id: "phoneNumber",
        type: "text",
        label: "Phone Number",
        required: false,
        placeholder: "Enter your phone number",
        validation: {
          pattern: "^\\+?[0-9]{7,15}$",
          message: "Please enter a valid phone number.",
        },
      },
      {
        id: "eventDate",
        type: "date",
        label: "Event Date",
        required: true,
      },
      {
        id: "preferences",
        type: "checkbox",
        label: "Preferences",
        required: false,
        options: [
          { value: "vegetarian", label: "Vegetarian" },
          { value: "vegan", label: "Vegan" },
          { value: "glutenFree", label: "Gluten-Free" },
          { value: "none", label: "None" },
        ],
      },
    ],
  },
  {
    formTitle: "Survey Form",
    formDescription: "Help us improve by filling out this survey.",
    fields: [
      {
        id: "participantName",
        type: "text",
        label: "Participant Name",
        required: true,
        placeholder: "Enter your name",
      },
      {
        id: "ageGroup",
        type: "select",
        label: "Age Group",
        required: true,
        options: [
          { value: "under18", label: "Under 18" },
          { value: "18-25", label: "18-25" },
          { value: "26-35", label: "26-35" },
          { value: "36-50", label: "36-50" },
          { value: "50plus", label: "50+" },
        ],
      },
      {
        id: "experience",
        type: "number",
        label: "How satisfied are you with the service? (1-10)",
        required: true,
        validation: {
          min: 1,
          max: 10,
          message: "Please rate between 1 and 10.",
        },
      },
      {
        id: "suggestions",
        type: "textarea",
        label: "Any Suggestions?",
        required: false,
        placeholder: "Enter your suggestions",
        validation: {
          maxLength: 300,
          message: "Suggestions cannot exceed 300 characters.",
        },
      },
    ],
  },
  {
    formTitle: "Job Application Form",
    formDescription: "Apply for your desired position by filling out the details below.",
    fields: [
      {
        id: "fullName",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address.",
        },
      },
      {
        id: "resume",
        type: "file",
        label: "Upload Resume",
        required: true,
        validation: {
          acceptedFileTypes: ["application/pdf", "application/msword", "text/plain"],
          message: "Please upload a valid resume (PDF, DOC, or TXT).",
        },
      },
      {
        id: "coverLetter",
        type: "textarea",
        label: "Cover Letter",
        required: false,
        placeholder: "Write a brief cover letter (optional)",
        validation: {
          maxLength: 500,
          message: "Cover letter cannot exceed 500 characters.",
        },
      },
    ],
  },
  {
    formTitle: "Travel Booking Form",
    formDescription: "Book your next adventure with us by filling out this form.",
    fields: [
      {
        id: "destination",
        type: "text",
        label: "Destination",
        required: true,
        placeholder: "Where are you going?",
      },
      {
        id: "departureDate",
        type: "date",
        label: "Departure Date",
        required: true,
      },
      {
        id: "returnDate",
        type: "date",
        label: "Return Date",
        required: true,
      },
      {
        id: "flightClass",
        type: "select",
        label: "Flight Class",
        required: true,
        options: [
          { value: "economy", label: "Economy" },
          { value: "business", label: "Business" },
          { value: "firstClass", label: "First Class" },
        ],
      },
      {
        id: "specialRequests",
        type: "textarea",
        label: "Special Requests",
        required: false,
        placeholder: "Any special requests or preferences",
      },
    ],
  },
  {
    formTitle: "Newsletter Subscription Form",
    formDescription: "Stay updated by subscribing to our newsletter.",
    fields: [
      {
        id: "fullName",
        type: "text",
        label: "Full Name",
        required: true,
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address.",
        },
      },
      {
        id: "frequency",
        type: "radio",
        label: "How often would you like to receive updates?",
        required: true,
        options: [
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
        ],
      },
      {
        id: "terms",
        type: "checkbox",
        label: "I agree to the terms and conditions.",
        required: true,
      },
    ],
  },
  {
    formTitle: "Product Purchase Form",
    formDescription: "Purchase your desired products through this form.",
    fields: [
      {
        id: "productName",
        type: "text",
        label: "Product Name",
        required: true,
        placeholder: "Enter the product name",
      },
      {
        id: "quantity",
        type: "number",
        label: "Quantity",
        required: true,
        placeholder: "Enter the quantity",
        validation: {
          min: 1,
          message: "Quantity must be at least 1.",
        },
      },
      {
        id: "deliveryAddress",
        type: "text",
        label: "Delivery Address",
        required: true,
        placeholder: "Enter your delivery address",
      },
      {
        id: "paymentMethod",
        type: "select",
        label: "Payment Method",
        required: true,
        options: [
          { value: "creditCard", label: "Credit Card" },
          { value: "paypal", label: "PayPal" },
          { value: "bankTransfer", label: "Bank Transfer" },
        ],
      },
      {
        id: "couponCode",
        type: "text",
        label: "Coupon Code (Optional)",
        required: false,
        placeholder: "Enter coupon code if you have one",
      },
    ],
  },
  {
    formTitle: "Contact Us Form",
    formDescription: "Have a question or need assistance? Get in touch with us.",
    fields: [
      {
        id: "name",
        type: "text",
        label: "Name",
        required: true,
        placeholder: "Enter your name",
      },
      {
        id: "email",
        type: "email",
        label: "Email Address",
        required: true,
        placeholder: "you@example.com",
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address.",
        },
      },
      {
        id: "subject",
        type: "text",
        label: "Subject",
        required: true,
        placeholder: "Enter the subject",
      },
      {
        id: "message",
        type: "textarea",
        label: "Message",
        required: true,
        placeholder: "Enter your message",
      },
      {
        id: "captcha",
        type: "text",
        label: "Enter the text in the image",
        required: true,
      },
    ],
  },
];

const JsonSchemaExamples: React.FC = () => {
  const {isDarkMode } = useTheme();
  const [copiedIndex,setCopiedIndex] = useState<number | null>(null);

//function to copy the example to the clipboard
  const handleCopy = (example: object,index:number) => {
    navigator.clipboard.writeText(JSON.stringify(example, null, 2));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null),2000);
  };

  return (
    <div className="flex flex-row gap-3 overflow-auto custom-scrollbar">
      {Examples.map((example, idx) => (
        <div
          key={idx}
          className={`relative bg-transparent min-w-[300px] h-[150px] p-2 rounded-lg overflow-hidden border border-gray-300 cursor-pointer hover:shadow-md
            ${isDarkMode?"text-white":"text-black"}`}
          onClick={() => handleCopy(example,idx)}
        > 
          {/* copied overlay */}
          {copiedIndex === idx && (
            <div className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm
            ${isDarkMode?"bg-white/50":"bg-black/50"}`}>
              <span className="text-white text-sm">Copied!</span>
            </div>
          )}
          {/* copied overlay */}
          <h3 className="font-bold text-sm mb-2">{example.formTitle}</h3>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(example, null, 2).slice(0, 400)}
            {JSON.stringify(example, null, 2).length > 400 && "..."}
          </pre>
        </div>
      ))}
    </div>
  );
};
export default JsonSchemaExamples;