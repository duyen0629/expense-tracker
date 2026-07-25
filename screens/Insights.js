import { View, Text, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { GlobalStyles } from "../constants/styles";
import PeriodSelector from "../components/Insights/PeriodSelector";
import {
  DEFAULT_PERIOD,
  filterExpensesByPeriod,
  getPeriodLabel,
} from "../util/periods";
import { getCategoryTotals } from "../util/insights";

function Insights() {
  const expensesContext = useContext(ExpensesContext);
  const [selectedPeriod, setSelectedPeriod] = useState(DEFAULT_PERIOD);

  const periodExpenses = filterExpensesByPeriod(
    expensesContext.expenses,
    selectedPeriod
  );
  const { total: periodTotal, count: periodCount } = getCategoryTotals(periodExpenses);

  return (
    <View style={styles.container}>
      <PeriodSelector selectedPeriod={selectedPeriod} onSelectPeriod={setSelectedPeriod} />
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{getPeriodLabel(selectedPeriod)}</Text>
        <Text style={styles.summaryAmount}>${periodTotal.toFixed(2)}</Text>
        <Text style={styles.summaryCount}>
          {periodCount} expense{periodCount === 1 ? "" : "s"}
        </Text>
      </View>
    </View>
  );
}

export default Insights;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  summaryCard: {
    marginTop: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary400,
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: GlobalStyles.colors.primary500,
  },
  summaryCount: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: GlobalStyles.colors.gray500,
  },
});
