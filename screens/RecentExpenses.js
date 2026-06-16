import { StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const expenseDate = new Date(expense.date);
    return expenseDate.getTime() > getDateMinusDays(today, 7).getTime();
  });
  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" />;
}

export default RecentExpenses;

const styles = StyleSheet.create({});
