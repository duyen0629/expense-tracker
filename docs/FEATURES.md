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

5. **Bar chart**
   - Horizontal bars sized relative to the top category (share of spending)
   - Label + % of period total per row; plain `View` bars (no chart library)
   - Shown above the category breakdown list
   - Files:
     - `components/Insights/CategoryBarChart.js`
     - `screens/Insights.js` (wired)

6. **Tap-through filter**
   - Tap a category bar or breakdown row on Insights → opens **All** tab
   - All Expenses applies that category chip via `route.params.category`
   - `ExpensesOutput` accepts `initialCategory` and syncs when params change
   - Files:
     - `screens/Insights.js`
     - `screens/AllExpenses.js`
     - `components/Expenses/ExpensesOutput.js`
     - `components/Insights/CategoryBreakdownList.js`
     - `components/Insights/CategoryBarChart.js`

7. **Polish**
   - Header: “Spending by category” + short supporting line
   - Summary card icon; themed loading card under summary
   - Empty state card (`InsightsEmptyState`) with icon + guidance
   - Error overlay icon + **Try Again** calls `reloadExpenses`
   - Loading overlay helper text
   - Files:
     - `components/Insights/InsightsShell.js`
     - `components/Insights/InsightsEmptyState.js`
     - `components/UI/ErrorOverlay.js`
     - `components/UI/LoadingOverlay.js`
     - `store/expenses-context.js`
     - `screens/Insights.js`
     - `screens/RecentExpenses.js`

### To implement later

_None for Spending Insights — all planned slices are done._

## Expense search

Search expenses by description on the **All** tab.

### Implemented

1. **Search bar**
   - Text field under the summary on All Expenses
   - Case-insensitive match on description
   - Works together with category chips
   - Summary total updates to match filtered results
   - Clear button when text is present
   - Files:
     - `components/Expenses/ExpenseSearchBar.js`
     - `components/Expenses/ExpensesOutput.js` (`enableSearch`)
     - `screens/AllExpenses.js` (enabled)
