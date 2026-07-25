import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { PERIODS } from "../../util/periods";

function PeriodSelector({ selectedPeriod, onSelectPeriod }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Period</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {PERIODS.map((period) => {
          const isSelected = selectedPeriod === period.id;
          return (
            <Pressable
              key={period.id}
              onPress={() => onSelectPeriod(period.id)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Ionicons
                name={period.icon}
                size={14}
                color={isSelected ? GlobalStyles.colors.surface : GlobalStyles.colors.primary700}
              />
              <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                {period.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default PeriodSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.surface,
    marginBottom: 10,
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
