import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import PeriodSelector from "./PeriodSelector";

function InsightsShell({
  selectedPeriod,
  onSelectPeriod,
  periodLabel,
  periodTotal,
  periodCount,
  isLoading,
  children,
}) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Spending by category</Text>
        <Text style={styles.subtitle}>See where your money goes for the selected period.</Text>
      </View>

      <PeriodSelector selectedPeriod={selectedPeriod} onSelectPeriod={onSelectPeriod} />

      <View style={styles.summaryCard}>
        <View style={styles.summaryTop}>
          <Ionicons name="wallet-outline" size={18} color={GlobalStyles.colors.primary400} />
          <Text style={styles.summaryLabel}>{periodLabel}</Text>
        </View>
        <Text style={styles.summaryAmount}>${periodTotal.toFixed(2)}</Text>
        <Text style={styles.summaryCount}>
          {periodCount} expense{periodCount === 1 ? "" : "s"}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.primary500} />
          <Text style={styles.loadingTitle}>Loading insights</Text>
          <Text style={styles.loadingText}>Fetching your expenses…</Text>
        </View>
      ) : (
        <View style={styles.body}>{children}</View>
      )}
    </ScrollView>
  );
}

export default InsightsShell;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    flexGrow: 1,
  },
  header: {
    marginBottom: 16,
    gap: 6,
  },
  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: GlobalStyles.colors.surface,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: GlobalStyles.colors.primary50,
    lineHeight: 20,
  },
  summaryCard: {
    marginTop: 8,
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary400,
    letterSpacing: 0.3,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "800",
    color: GlobalStyles.colors.primary500,
  },
  summaryCount: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: GlobalStyles.colors.gray500,
  },
  loadingCard: {
    marginTop: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    alignItems: "center",
    gap: 8,
  },
  loadingTitle: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "800",
    color: GlobalStyles.colors.primary800,
  },
  loadingText: {
    color: GlobalStyles.colors.gray500,
    fontSize: 14,
    fontWeight: "600",
  },
  body: {
    marginTop: 20,
    flex: 1,
  },
});
