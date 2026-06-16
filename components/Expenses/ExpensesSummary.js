import { View, Text } from "react-native";

function ExpensesSummary(expenses) {
  return (
    <View>
      <Text>Last 7 Days</Text>
      <Text>${expenses.total}</Text>
    </View>
  );
}

export default ExpensesSummary;
