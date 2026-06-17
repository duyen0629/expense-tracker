import { StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useState, useEffect } from "react";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);

      expensesContext.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
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
