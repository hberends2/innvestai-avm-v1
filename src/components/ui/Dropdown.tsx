import React, { useState } from "react";

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: string[];
  required?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  options = ["Option 1", "Option 2", "Option 3", "Option 4"],
  required = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-0">
      <label htmlFor={id} className="block mb-1 font-medium text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          type="button"
        >
          {value || "Select an option"}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
            <ul className="py-1 overflow-auto text-base max-h-60" role="listbox">
              {options.map((option) => (
                <li
                  key={option}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs"
                  role="option"
                  aria-selected={value === option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;