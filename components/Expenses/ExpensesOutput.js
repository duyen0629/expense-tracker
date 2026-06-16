import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2026-06-15"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 49.05,
    date: new Date("2026-06-15"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 8.59,
    date: new Date("2026-06-15"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 29.99,
    date: new Date("2026-06-15"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2026-06-14"),
  },
];

function ExpensesOutput({ periodName }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName="Last 7 Days" expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
