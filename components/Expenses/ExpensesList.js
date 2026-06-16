import { View, Text, FlatList } from "react-native";

function renderExpenseItem(itemData) {
  return (
    <View>
      <Text>{itemData.item.description}</Text>
      <Text>${itemData.item.amount.toFixed(2)}</Text>
    </View>
  );
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
