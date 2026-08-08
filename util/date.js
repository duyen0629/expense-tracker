export const getFormattedDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const parseFormattedDate = (dateString) => {
  if (!dateString) {
    return new Date();
  }
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Human-friendly date for list rows: Today, Yesterday, weekday, or short date.
 */
export const getDisplayDate = (date, now = new Date()) => {
  const expenseDay = startOfDay(new Date(date));
  const today = startOfDay(now);
  const dayDiff = Math.round((today - expenseDay) / (1000 * 60 * 60 * 24));

  if (dayDiff === 0) {
    return "Today";
  }
  if (dayDiff === 1) {
    return "Yesterday";
  }
  if (dayDiff > 1 && dayDiff < 7) {
    return expenseDay.toLocaleDateString(undefined, { weekday: "long" });
  }

  return expenseDay.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: expenseDay.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
};
