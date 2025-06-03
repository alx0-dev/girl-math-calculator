import React from 'react';
import { Outlet } from 'react-router-dom';
import { GraduationCap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrency, CurrencyCode, currencies } from '../contexts/CurrencyContext';

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-colors duration-200">
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-pink-500 dark:text-pink-400 h-8 w-8" />
          <h1 className="font-bold text-2xl tracking-tight bg-gradient-to-r from-pink-500 to-violet-500 dark:from-pink-400 dark:to-violet-400 text-transparent bg-clip-text">
            Girl Math
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={currency.code}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:text-white"
          >
            {currencies.map(curr => (
              <option key={curr.code} value={curr.code}>
                {curr.symbol} {curr.code}
              </option>
            ))}
          </select>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="py-6 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Girl Math Calculator</p>
      </footer>
    </div>
  );
};

export default Layout;