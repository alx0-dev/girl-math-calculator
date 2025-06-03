import React, { useState, useEffect } from "react";
import { calculateTimeToEarn } from "../utils/calculations";
import ResultsDisplay from "./ResultsDisplay";
import InputField from "./InputField";
import { useCurrency } from "../contexts/CurrencyContext";

const Calculator: React.FC = () => {
    const [salary, setSalary] = useState<string>("");
    const [itemPrice, setItemPrice] = useState<string>("");
    const [salaryType, setSalaryType] = useState<"monthly" | "annual">(
        "monthly"
    );
    const [results, setResults] = useState<{
        hours: number;
        days: number;
        months: number;
    } | null>(null);
    const [errors, setErrors] = useState({
        salary: "",
        itemPrice: "",
    });

    const { currency } = useCurrency();

    const validateInputs = (): boolean => {
        const newErrors = {
            salary: "",
            itemPrice: "",
        };

        if (!salary || isNaN(Number(salary)) || Number(salary) <= 0) {
            newErrors.salary = "Please enter a valid salary amount";
        }

        if (!itemPrice || isNaN(Number(itemPrice)) || Number(itemPrice) <= 0) {
            newErrors.itemPrice = "Please enter a valid price";
        }

        setErrors(newErrors);

        return !newErrors.salary && !newErrors.itemPrice;
    };

    useEffect(() => {
        if (
            salary &&
            itemPrice &&
            Number(salary) > 0 &&
            Number(itemPrice) > 0
        ) {
            const { hours, days, months } = calculateTimeToEarn(
                Number(salary),
                Number(itemPrice),
                salaryType
            );
            setResults({ hours, days, months });
        } else {
            setResults(null);
        }
    }, [salary, itemPrice, salaryType]);

    return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 dark:from-pink-500 dark:to-purple-600 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        Girl Math Calculator
                    </h2>
                    <p className="opacity-90">
                        Find out if that purchase is actually *free* according
                        to girl math ✨
                    </p>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-700 dark:text-gray-200 font-medium">
                                Your Salary
                            </label>
                            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                                <button
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                                        salaryType === "monthly"
                                            ? "bg-white dark:bg-gray-800 shadow-sm text-pink-600 dark:text-pink-400"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    }`}
                                    onClick={() => setSalaryType("monthly")}
                                >
                                    Monthly
                                </button>
                                <button
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                                        salaryType === "annual"
                                            ? "bg-white dark:bg-gray-800 shadow-sm text-pink-600 dark:text-pink-400"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                    }`}
                                    onClick={() => setSalaryType("annual")}
                                >
                                    Annual
                                </button>
                            </div>
                        </div>
                        <InputField
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder={`Enter your ${salaryType} salary`}
                            error={errors.salary}
                            type="number"
                            min="0"
                            currencySymbol={currency.symbol}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                            Item Price
                        </label>
                        <InputField
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                            placeholder="Enter the price of your item"
                            error={errors.itemPrice}
                            type="number"
                            min="0"
                            currencySymbol={currency.symbol}
                        />
                    </div>

                    {results && (
                        <ResultsDisplay
                            results={results}
                            itemPrice={Number(itemPrice)}
                            currency={currency}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
