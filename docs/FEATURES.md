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

### To implement later

2. **Category totals calculation**
   - Pure helper: from expenses + period → `{ categoryId, total, count }` (+ overall total)

3. **Insights screen shell**
   - Loading / empty states around the period selector (beyond the current summary card)

4. **Category breakdown list**
   - Per-category icon, label, amount, and % of total

5. **Bar chart**
   - Simple bars (or chart lib later) sized by share of total

6. **Tap-through filter**
   - Tap a category on Insights → open All/Recent with that category selected

7. **Polish**
   - Theme-aligned colors, empty/error/loading polish, short “Spending by category” header

### Suggested build order

`2 → 3 → 4 → 5 → 6 → 7`  
(Period selector / slice 1 is done.)
