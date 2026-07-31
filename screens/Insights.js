import { StyleSheet, View } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ExpensesContext } from "../store/expenses-context";
import InsightsShell from "../components/Insights/InsightsShell";
import CategoryBarChart from "../components/Insights/CategoryBarChart";
import CategoryBreakdownList from "../components/Insights/CategoryBreakdownList";
import InsightsEmptyState from "../components/Insights/InsightsEmptyState";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import {
  DEFAULT_PERIOD,
  filterExpensesByPeriod,
  getPeriodLabel,
} from "../util/periods";
import { getCategoryTotals } from "../util/insights";

function Insights() {
  const navigation = useNavigation();
  const expensesContext = useContext(ExpensesContext);
  const [selectedPeriod, setSelectedPeriod] = useState(DEFAULT_PERIOD);

  if (expensesContext.error) {
    return (
      <ErrorOverlay
        message={expensesContext.error}
        onConfirm={expensesContext.reloadExpenses}
      />
    );
  }

  const periodExpenses = filterExpensesByPeriod(
    expensesContext.expenses,
    selectedPeriod
  );
  const { total: periodTotal, count: periodCount, categories } =
    getCategoryTotals(periodExpenses);

  function categoryPressHandler(categoryId) {
    navigation.navigate("AllExpenses", { category: categoryId });
  }

  let bodyContent = null;

  if (!expensesContext.isLoading && periodCount === 0) {
    bodyContent = <InsightsEmptyState periodLabel={getPeriodLabel(selectedPeriod)} />;
  } else if (!expensesContext.isLoading && periodCount > 0) {
    bodyContent = (
      <View>
        <CategoryBarChart
          categories={categories}
          total={periodTotal}
          onCategoryPress={categoryPressHandler}
        />
        <CategoryBreakdownList
          categories={categories}
          total={periodTotal}
          onCategoryPress={categoryPressHandler}
        />
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

const styles = StyleSheet.create({});
