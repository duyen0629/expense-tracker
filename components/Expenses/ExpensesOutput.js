import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { CATEGORIES } from "../../constants/categories";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import ExpenseSearchBar from "./ExpenseSearchBar";
import ExpenseSortBar from "./ExpenseSortBar";
import { DEFAULT_SORT, sortExpenses } from "../../util/sort";

function ExpensesOutput({
  expenses,
  periodName,
  fallbackText,
  initialCategory = "all",
  categoryRequestId = 0,
  enableSearch = false,
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState(DEFAULT_SORT);

  useEffect(() => {
    setSelectedCategory(initialCategory || "all");
  }, [initialCategory, categoryRequestId]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;
    const matchesSearch =
      !normalizedQuery ||
      expense.description.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });

  const displayedExpenses = sortExpenses(filteredExpenses, selectedSort);

  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (displayedExpenses.length > 0) {
    content = <ExpensesList expenses={displayedExpenses} />;
  } else if (expenses.length > 0) {
    if (normalizedQuery) {
      content = <Text style={styles.infoText}>No expenses match your search.</Text>;
    } else {
      content = <Text style={styles.infoText}>No expenses in this category.</Text>;
    }
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={displayedExpenses} />
      {enableSearch && (
        <ExpenseSearchBar value={searchQuery} onChangeText={setSearchQuery} />
      )}
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
          <Ionicons
            name="apps"
            size={14}
            color={
              selectedCategory === "all"
                ? GlobalStyles.colors.surface
                : GlobalStyles.colors.primary700
            }
          />
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
              <Ionicons
                name={category.icon}
                size={14}
                color={isSelected ? GlobalStyles.colors.surface : GlobalStyles.colors.primary700}
              />
              <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                {category.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ExpenseSortBar selectedSort={selectedSort} onSelectSort={setSelectedSort} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.background,
    flex: 1,
  },
  filterScroll: {
    flexGrow: 0,
    marginTop: 14,
    marginBottom: 0,
  },
  filterRow: {
    gap: 8,
    paddingRight: 8,
    alignItems: "center",
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: GlobalStyles.colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.55)",
  },
  filterChipSelected: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.primary500,
  },
  filterChipText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 13,
    fontWeight: "700",
  },
  filterChipTextSelected: {
    color: GlobalStyles.colors.surface,
  },
  infoText: {
    color: GlobalStyles.colors.primary800,
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    fontWeight: "600",
  },
});
