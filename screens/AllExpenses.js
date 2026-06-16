import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { DUMMY_EXPENSES } from "../components/Expenses/ExpensesOutput";

function AllExpenses() {
  return <ExpensesOutput expenses={DUMMY_EXPENSES} periodName="Last 7 Days" />;
}

export default AllExpenses;

const styles = StyleSheet.create({});
