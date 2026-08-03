export const SORT_OPTIONS = [
  { id: "newest", label: "Newest", icon: "arrow-down" },
  { id: "oldest", label: "Oldest", icon: "arrow-up" },
  { id: "highest", label: "Highest", icon: "cash" },
  { id: "lowest", label: "Lowest", icon: "pricetag" },
];

export const DEFAULT_SORT = "newest";

export function sortExpenses(expenses, sortId) {
  const sorted = [...expenses];

  switch (sortId) {
    case "oldest":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    case "highest":
      return sorted.sort((a, b) => b.amount - a.amount);
    case "lowest":
      return sorted.sort((a, b) => a.amount - b.amount);
    case "newest":
    default:
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}
