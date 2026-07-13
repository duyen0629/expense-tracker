import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.amount}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  period: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary400,
    letterSpacing: 0.3,
  },
  amount: {
    fontSize: 20,
    fontWeight: "800",
    color: GlobalStyles.colors.primary500,
  },
});
