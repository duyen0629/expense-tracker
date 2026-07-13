import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { CATEGORIES } from "../../constants/categories";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, periodName, fallbackText }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredExpenses =
    selectedCategory === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (filteredExpenses.length > 0) {
    content = <ExpensesList expenses={filteredExpenses} />;
  } else if (expenses.length > 0) {
    content = <Text style={styles.infoText}>No expenses in this category.</Text>;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={filteredExpenses} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={styles.filterScroll}
      >
        <Pressable
          onPress={() => setSelectedCategory("all")}
          style={[styles.filterChip, selectedCategory === "all" && styles.filterChipSelected]}
        >
          <Text
            style={[
              styles.filterChipText,
              selectedCategory === "all" && styles.filterChipTextSelected,
            ]}
          >
            All
          </Text>
        </Pressable>
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[styles.filterChip, isSelected && styles.filterChipSelected]}
            >
              <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      {content}
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
  filterScroll: {
    flexGrow: 0,
    marginTop: 12,
    marginBottom: 8,
  },
  filterRow: {
    gap: 8,
    paddingRight: 8,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  filterChipSelected: {
    backgroundColor: GlobalStyles.colors.accent500,
  },
  filterChipText: {
    color: GlobalStyles.colors.primary50,
    fontSize: 13,
    fontWeight: "600",
  },
  filterChipTextSelected: {
    color: GlobalStyles.colors.primary800,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
