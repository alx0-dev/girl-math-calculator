import React from "react";

interface InputFieldProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
    type?: string;
    min?: string;
    currencySymbol?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    value,
    onChange,
    placeholder,
    error,
    type = "text",
    min,
    currencySymbol,
}) => {
    return (
        <div>
            <div
                className={`flex items-center border rounded-lg overflow-hidden transition-all ${
                    error
                        ? "border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20"
                        : "border-gray-300 dark:border-gray-600 focus-within:border-purple-400 dark:focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 dark:focus-within:ring-purple-900"
                }`}
            >
                <div className="pl-3 flex items-center">
                    {currencySymbol && (
                        <span className="text-gray-400 dark:text-gray-500 ml-1">
                            {currencySymbol}
                        </span>
                    )}
                </div>
                <input
                    type={type}
                    min={min}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full p-3 outline-none bg-transparent dark:text-white"
                />
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
};

export default InputField;
