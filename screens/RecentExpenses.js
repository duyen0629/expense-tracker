import { StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import { getDateMinusDays } from "../util/date";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  if (expensesContext.isLoading) {
    return <LoadingOverlay />;
  }

  if (expensesContext.error) {
    return (
      <ErrorOverlay message={expensesContext.error} onConfirm={expensesContext.reloadExpenses} />
    );
  }

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date);
    return expenseDate.getTime() > getDateMinusDays(today, 7).getTime();
  });
  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" fallbackText="No recent expenses found." />;
}

export default RecentExpenses;

const styles = StyleSheet.create({});
