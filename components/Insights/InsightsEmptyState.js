import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

function InsightsEmptyState({ periodLabel }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="pie-chart-outline" size={28} color={GlobalStyles.colors.primary500} />
      </View>
      <Text style={styles.title}>No spending yet</Text>
      <Text style={styles.message}>
        No expenses in {periodLabel.toLowerCase()}. Try another period or add an expense with the +
        button.
      </Text>
    </View>
  );
}

export default InsightsEmptyState;

const styles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: GlobalStyles.colors.primary50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "800",
    color: GlobalStyles.colors.primary800,
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    color: GlobalStyles.colors.gray500,
    textAlign: "center",
    lineHeight: 20,
  },
});
