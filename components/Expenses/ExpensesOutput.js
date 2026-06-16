import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, periodName }) {
  return (
    <View>
      <ExpensesSummary periodName="Last 7 Days" expenses={expenses} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

export default ExpensesOutput;
