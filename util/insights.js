import { DEFAULT_CATEGORY } from "../constants/categories";

/**
 * Aggregate expenses by category.
 * Pass already period-filtered expenses (or all expenses).
 *
 * @returns {{
 *   categories: Array<{ categoryId: string, total: number, count: number }>,
 *   total: number,
 *   count: number,
 * }}
 */
export function getCategoryTotals(expenses) {
  const byCategory = {};

  for (const expense of expenses) {
    const categoryId = expense.category || DEFAULT_CATEGORY;

    if (!byCategory[categoryId]) {
      byCategory[categoryId] = {
        categoryId,
        total: 0,
        count: 0,
      };
    }

    byCategory[categoryId].total += expense.amount;
    byCategory[categoryId].count += 1;
  }

  const categories = Object.values(byCategory).sort((a, b) => b.total - a.total);
  const total = categories.reduce((sum, item) => sum + item.total, 0);
  const count = expenses.length;

  return { categories, total, count };
}
