import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
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
      <Text style={styles.heading}>Spending overview</Text>
      <PeriodSelector selectedPeriod={selectedPeriod} onSelectPeriod={onSelectPeriod} />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{periodLabel}</Text>
        <Text style={styles.summaryAmount}>${periodTotal.toFixed(2)}</Text>
        <Text style={styles.summaryCount}>
          {periodCount} expense{periodCount === 1 ? "" : "s"}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.surface} />
          <Text style={styles.loadingText}>Loading expenses…</Text>
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
  heading: {
    fontSize: 15,
    fontWeight: "700",
    color: GlobalStyles.colors.primary50,
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  summaryCard: {
    marginTop: 16,
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
  summaryLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary400,
    letterSpacing: 0.3,
    marginBottom: 6,
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
  loadingContainer: {
    marginTop: 32,
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: GlobalStyles.colors.primary50,
    fontSize: 15,
    fontWeight: "600",
  },
  body: {
    marginTop: 20,
    flex: 1,
  },
});
