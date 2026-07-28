import { Text, StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { GlobalStyles } from "../constants/styles";
import InsightsShell from "../components/Insights/InsightsShell";
import CategoryBarChart from "../components/Insights/CategoryBarChart";
import CategoryBreakdownList from "../components/Insights/CategoryBreakdownList";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import {
  DEFAULT_PERIOD,
  filterExpensesByPeriod,
  getPeriodLabel,
} from "../util/periods";
import { getCategoryTotals } from "../util/insights";

function Insights() {
  const expensesContext = useContext(ExpensesContext);
  const [selectedPeriod, setSelectedPeriod] = useState(DEFAULT_PERIOD);

  if (expensesContext.error) {
    return (
      <ErrorOverlay message={expensesContext.error} onConfirm={expensesContext.clearError} />
    );
  }

  const periodExpenses = filterExpensesByPeriod(
    expensesContext.expenses,
    selectedPeriod
  );
  const { total: periodTotal, count: periodCount, categories } =
    getCategoryTotals(periodExpenses);

  let bodyContent = null;

  if (!expensesContext.isLoading && periodCount === 0) {
    bodyContent = (
      <Text style={styles.emptyText}>
        No expenses in {getPeriodLabel(selectedPeriod).toLowerCase()}. Try another period or add
        an expense.
      </Text>
    );
  } else if (!expensesContext.isLoading && periodCount > 0) {
    bodyContent = (
      <View>
        <CategoryBarChart categories={categories} total={periodTotal} />
        <CategoryBreakdownList categories={categories} total={periodTotal} />
      </View>
    );
  }

  return (
    <InsightsShell
      selectedPeriod={selectedPeriod}
      onSelectPeriod={setSelectedPeriod}
      periodLabel={getPeriodLabel(selectedPeriod)}
      periodTotal={periodTotal}
      periodCount={periodCount}
      isLoading={expensesContext.isLoading}
    >
      {bodyContent}
    </InsightsShell>
  );
}

export default Insights;

const styles = StyleSheet.create({
  emptyText: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    lineHeight: 22,
    paddingHorizontal: 8,
  },
});
