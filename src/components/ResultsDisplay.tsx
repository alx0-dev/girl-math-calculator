import React from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { getGirlMathJustification } from '../utils/girlMathLogic';
import type { currencies } from '../contexts/CurrencyContext';

interface ResultsDisplayProps {
  results: {
    hours: number;
    days: number;
    months: number;
  };
  itemPrice: number;
  currency: typeof currencies[number];
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, itemPrice, currency }) => {
  const { hours, days, months } = results;
  const justification = getGirlMathJustification(hours, itemPrice, currency);

  const ResultCard = ({ 
    icon, 
    title, 
    value, 
    unit 
  }: { 
    icon: React.ReactNode; 
    title: string; 
    value: number; 
    unit: string; 
  }) => (
    <div className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-600 transition-all hover:shadow-md">
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">{icon}</div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <p className="font-bold text-lg dark:text-white">
            {value.toFixed(1)} <span className="text-gray-500 dark:text-gray-400 font-normal">{unit}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">You need to work...</h3>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        <ResultCard
          icon={<Clock className="h-5 w-5 text-purple-500 dark:text-purple-400" />}
          title="Hours"
          value={hours}
          unit="hrs"
        />
        <ResultCard
          icon={<Clock className="h-5 w-5 text-pink-500 dark:text-pink-400" />}
          title="Days"
          value={days}
          unit="days"
        />
        <ResultCard
          icon={<Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />}
          title="Months"
          value={months}
          unit="mo"
        />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800 mb-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-1">Girl Math Says:</h4>
            <p className="text-gray-700 dark:text-gray-300">{justification}</p>
          </div>
        </div>
      </div>

      <button 
        className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-600 dark:to-purple-600 text-white font-medium rounded-lg shadow-sm hover:from-pink-600 hover:to-purple-600 dark:hover:from-pink-700 dark:hover:to-purple-700 transition-all active:scale-98 active:shadow-inner"
        onClick={() => {
          navigator.clipboard.writeText(justification);
          alert('Copied to clipboard! Share this girl math with your friends!');
        }}
      >
        Share This Justification
      </button>
    </div>
  );
};

export default ResultsDisplay;