import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ periodName, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  const count = expenses.length;
  const countLabel = `${count} expense${count === 1 ? "" : "s"}`;

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.count}>{countLabel}</Text>
      </View>
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
  details: {
    flex: 1,
    marginRight: 12,
  },
  period: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary400,
    letterSpacing: 0.3,
  },
  count: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    color: GlobalStyles.colors.gray500,
  },
  amount: {
    fontSize: 20,
    fontWeight: "800",
    color: GlobalStyles.colors.primary500,
  },
});
