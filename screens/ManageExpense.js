import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";

function ManageExpense({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>Manage Expense</Text>
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({});
