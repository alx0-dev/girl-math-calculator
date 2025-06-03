export const calculateTimeToEarn = (
  salary: number,
  itemPrice: number,
  salaryType: 'monthly' | 'annual'
): { hours: number; days: number; months: number } => {
  // Convert annual salary to monthly if needed
  const monthlySalary = salaryType === 'annual' ? salary / 12 : salary;
  
  // Average working days per month is around 21
  const workingDaysPerMonth = 21;
  
  // Average working hours per day is 8
  const workingHoursPerDay = 8;
  
  // Calculate hours, days, and months
  const workingHoursPerMonth = workingDaysPerMonth * workingHoursPerDay;
  const hourlyRate = monthlySalary / workingHoursPerMonth;
  
  const hours = itemPrice / hourlyRate;
  const days = hours / workingHoursPerDay;
  const months = days / workingDaysPerMonth;
  
  return {
    hours,
    days,
    months
  };
};