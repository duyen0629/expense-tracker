import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      periodName="Total"
      fallbackText="No registered expenses found."
    />
  );
}

export default AllExpenses;

const styles = StyleSheet.create({});
