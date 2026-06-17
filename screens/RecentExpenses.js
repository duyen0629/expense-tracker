import { StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useEffect } from "react";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
    }

    getExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date);
    return expenseDate.getTime() > getDateMinusDays(today, 7).getTime();
  });
  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" fallbackText="No recent expenses found." />;
}

export default RecentExpenses;

const styles = StyleSheet.create({});
