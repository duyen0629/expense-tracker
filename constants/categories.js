export const CATEGORIES = [
  { id: "food", label: "Food", icon: "restaurant" },
  { id: "transport", label: "Transport", icon: "car" },
  { id: "housing", label: "Housing", icon: "home" },
  { id: "entertainment", label: "Entertainment", icon: "film" },
  { id: "shopping", label: "Shopping", icon: "cart" },
  { id: "health", label: "Health", icon: "medkit" },
  { id: "other", label: "Other", icon: "sparkles" },
];

export const DEFAULT_CATEGORY = "other";

export function getCategoryLabel(categoryId) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return category ? category.label : "Other";
}

export function getCategoryIcon(categoryId) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return category ? category.icon : "sparkles";
}
