import React, { createContext, useContext, useState } from 'react';

export const currencies = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'PHP', symbol: '₱' },
  { code: 'PLN', symbol: 'zł' },
] as const;

export type CurrencyCode = typeof currencies[number]['code'];

interface CurrencyContextType {
  currency: typeof currencies[number];
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState(currencies[0]);

  const setCurrency = (code: CurrencyCode) => {
    const newCurrency = currencies.find(c => c.code === code);
    if (newCurrency) {
      setCurrencyState(newCurrency);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};