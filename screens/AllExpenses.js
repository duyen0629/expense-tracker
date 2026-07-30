import { StyleSheet } from "react-native";
import { useCallback, useContext, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses({ route, navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const [categoryFilter, setCategoryFilter] = useState({
    category: "all",
    requestId: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const category = route.params?.category;
      if (!category) {
        return;
      }

      setCategoryFilter({ category, requestId: Date.now() });
      navigation.setParams({ category: undefined });
    }, [route.params?.category, navigation])
  );

  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      periodName="Total"
      fallbackText="No registered expenses found."
      initialCategory={categoryFilter.category}
      categoryRequestId={categoryFilter.requestId}
    />
  );
}

export default AllExpenses;

const styles = StyleSheet.create({});
