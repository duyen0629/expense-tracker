import { getDateMinusDays } from "./date";

export const PERIODS = [
  { id: "month", label: "This month", icon: "calendar" },
  { id: "week", label: "Last 7 days", icon: "time" },
  { id: "all", label: "All time", icon: "infinite" },
];

export const DEFAULT_PERIOD = "month";

export function getPeriodLabel(periodId) {
  const period = PERIODS.find((item) => item.id === periodId);
  return period ? period.label : "This month";
}

export function getPeriodStartDate(periodId, now = new Date()) {
  switch (periodId) {
    case "week":
      return getDateMinusDays(now, 7);
    case "month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "all":
    default:
      return null;
  }
}

export function filterExpensesByPeriod(expenses, periodId, now = new Date()) {
  const startDate = getPeriodStartDate(periodId, now);

  if (!startDate) {
    return expenses;
  }

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getTime() >= startDate.getTime();
  });
}
