# Features

## Spending Insights

Category spending overview for a selected time period.

### Implemented

1. **Period selector**
   - Insights tab in bottom navigation
   - Period chips: This month, Last 7 days, All time
   - Filters expenses by period and shows total + expense count
   - Files:
     - `util/periods.js`
     - `components/Insights/PeriodSelector.js`
     - `screens/Insights.js`
     - `App.js` (Insights tab)

2. **Category totals calculation**
   - Pure helper `getCategoryTotals(expenses)` → `{ categories: [{ categoryId, total, count }], total, count }`
   - Categories sorted by total (highest first); missing category falls back to default
   - Insights summary uses this helper for period total + count
   - Files:
     - `util/insights.js`
     - `screens/Insights.js` (wired)

3. **Insights screen shell**
   - Shared expense load in `ExpensesContextProvider` (`isLoading`, `error`)
   - `InsightsShell`: scroll layout, heading, period selector, summary card, body slot
   - Loading spinner below summary (period chips stay usable)
   - Empty message when the selected period has no expenses
   - Fetch error uses `ErrorOverlay` (same as Recent)
   - Files:
     - `components/Insights/InsightsShell.js`
     - `screens/Insights.js`
     - `store/expenses-context.js`
     - `screens/RecentExpenses.js` (uses shared load)

4. **Category breakdown list**
   - “By category” section under the summary
   - Each row: icon, label, expense count, % of period total, amount
   - Sorted by spend (from `getCategoryTotals`)
   - Files:
     - `components/Insights/CategoryBreakdownList.js`
     - `screens/Insights.js` (wired)

### To implement later

5. **Bar chart**
   - Simple bars (or chart lib later) sized by share of total

6. **Tap-through filter**
   - Tap a category on Insights → open All/Recent with that category selected

7. **Polish**
   - Theme-aligned colors, empty/error/loading polish, short “Spending by category” header

### Suggested build order

`5 → 6 → 7`  
(Slices 1–4 are done.)
