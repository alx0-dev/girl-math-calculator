import type { currencies } from '../contexts/CurrencyContext';

export const getGirlMathJustification = (
  hours: number, 
  itemPrice: number,
  currency: typeof currencies[number]
): string => {
  const formatPrice = (price: number) => `${currency.symbol}${price.toFixed(2)}`;

  if (hours < 4) {
    return `This only costs ${hours.toFixed(1)} hours of work, which is basically nothing! It's practically free. Totally worth it! 💅`;
  } else if (hours < 8) {
    return `It's less than one workday to earn ${formatPrice(itemPrice)}, so it's basically on sale! If you don't buy it, you're actually losing money. 💸`;
  } else if (hours < 24) {
    return `If you skip your daily coffee for a week, this pays for itself! Besides, anything that costs less than 24 hours of work is basically a necessity. 💯`;
  } else if (hours < 40) {
    return `It's less than a week of work, and since you get paid every two weeks anyway, half your paycheck is already spoken for. This is just budget management! 💁‍♀️`;
  } else if (hours < 80) {
    return `This is an investment in yourself! And since you can use a credit card, it's basically free for 30 days. Future you can worry about it! ✨`;
  } else {
    return `${formatPrice(itemPrice)} might seem expensive, but if you break down the cost over how much you'll use it over your lifetime, it's only pennies per use! That's basically saving money. 💖`;
  }
};