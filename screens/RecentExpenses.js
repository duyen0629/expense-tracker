import { StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useState, useEffect } from "react";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesContext.setExpenses(expenses);
      } catch (error) {
        setError("Failed to fetch expenses");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
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
