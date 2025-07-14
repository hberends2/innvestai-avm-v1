import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type: "text" | "integer" | "percentage" | "currency";
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  placeholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Basic input validation based on type
    if (type === "integer") {
      // Allow only numbers
      newValue = newValue.replace(/[^0-9]/g, "");
    } else if (type === "percentage") {
      // Allow numbers and decimal point
      newValue = newValue.replace(/[^0-9.]/g, "");
    } else if (type === "currency") {
      // Allow numbers and decimal point
      newValue = newValue.replace(/[^0-9.]/g, "");
    }
    
    onChange(newValue);
  };

  return (
    <div className="mb-0">
      <label htmlFor={id} className="block mb-1 font-medium text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
        required={required}
        placeholder={
          placeholder || 
          (type === "percentage" 
            ? "Enter percentage" 
            : type === "currency" 
              ? "Enter amount" 
              : type === "integer" 
                ? "Enter number" 
                : "Enter text")
        }
      />
    </div>
  );
};

export default FormField;