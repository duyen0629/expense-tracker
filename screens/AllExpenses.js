import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";

function AllExpenses() {
  return <ExpensesOutput periodName="Last 7 Days" />;
}

export default AllExpenses;

const styles = StyleSheet.create({});
