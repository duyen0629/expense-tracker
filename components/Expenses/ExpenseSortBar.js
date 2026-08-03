import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { SORT_OPTIONS } from "../../util/sort";

function ExpenseSortBar({ selectedSort, onSelectSort }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {SORT_OPTIONS.map((option) => {
          const isSelected = selectedSort === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelectSort(option.id)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Ionicons
                name={option.icon}
                size={14}
                color={isSelected ? GlobalStyles.colors.surface : GlobalStyles.colors.primary700}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ExpenseSortBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: GlobalStyles.colors.primary50,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  row: {
    gap: 8,
    paddingRight: 8,
    alignItems: "center",
  },
  chip: {
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
  chipSelected: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.primary500,
  },
  chipText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 13,
    fontWeight: "700",
  },
  chipTextSelected: {
    color: GlobalStyles.colors.surface,
  },
});
