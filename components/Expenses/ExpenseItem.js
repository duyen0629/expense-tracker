import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { getCategoryLabel } from "../../constants/categories";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View style={styles.details}>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.dateText}>{getFormattedDate(date)}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.category}>{getCategoryLabel(category)}</Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  expenseItem: {
    padding: 14,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    elevation: 2,
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
  },
  details: {
    flex: 1,
    marginRight: 12,
  },
  textBase: {
    color: GlobalStyles.colors.gray700,
  },
  description: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: GlobalStyles.colors.primary800,
  },
  dateText: {
    color: GlobalStyles.colors.gray500,
    fontSize: 13,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: GlobalStyles.colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  category: {
    fontSize: 12,
    fontWeight: "700",
    color: GlobalStyles.colors.accent500,
  },
  amountContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: GlobalStyles.colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    minWidth: 84,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "800",
    fontSize: 15,
  },
});
