export const CATEGORIES = [
  { id: "food", label: "Food" },
  { id: "transport", label: "Transport" },
  { id: "housing", label: "Housing" },
  { id: "entertainment", label: "Entertainment" },
  { id: "shopping", label: "Shopping" },
  { id: "health", label: "Health" },
  { id: "other", label: "Other" },
];

export const DEFAULT_CATEGORY = "other";

export function getCategoryLabel(categoryId) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return category ? category.label : "Other";
}
