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
  {
    id: "e6",
    description: "Groceries",
    amount: 72.34,
    date: new Date("2026-06-14"),
  },
  {
    id: "e7",
    description: "Coffee",
    amount: 4.5,
    date: new Date("2026-06-13"),
  },
  {
    id: "e8",
    description: "Movie tickets",
    amount: 24.0,
    date: new Date("2026-06-13"),
  },
  {
    id: "e9",
    description: "Gas",
    amount: 45.2,
    date: new Date("2026-06-12"),
  },
  {
    id: "e10",
    description: "Restaurant dinner",
    amount: 38.75,
    date: new Date("2026-06-12"),
  },
  {
    id: "e11",
    description: "Gym membership",
    amount: 35.0,
    date: new Date("2026-06-11"),
  },
  {
    id: "e12",
    description: "Phone bill",
    amount: 55.99,
    date: new Date("2026-06-10"),
  },
  {
    id: "e13",
    description: "Headphones",
    amount: 89.99,
    date: new Date("2026-06-09"),
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
});
