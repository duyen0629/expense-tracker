import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getCategoryLabel } from "../../constants/categories";

function CategoryBarChart({ categories, total }) {
  if (categories.length === 0 || total <= 0) {
    return null;
  }

  const maxTotal = Math.max(...categories.map((item) => item.total));

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Share of spending</Text>
      <View style={styles.card}>
        {categories.map((item) => {
          const percentOfTotal = Math.round((item.total / total) * 100);
          const barWidthPercent = maxTotal > 0 ? (item.total / maxTotal) * 100 : 0;

          return (
            <View key={item.categoryId} style={styles.barRow}>
              <View style={styles.labelRow}>
                <Text style={styles.label} numberOfLines={1}>
                  {getCategoryLabel(item.categoryId)}
                </Text>
                <Text style={styles.percent}>{percentOfTotal}%</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${barWidthPercent}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default CategoryBarChart;

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary50,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  barRow: {
    gap: 6,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  label: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary800,
  },
  percent: {
    fontSize: 13,
    fontWeight: "800",
    color: GlobalStyles.colors.primary500,
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: GlobalStyles.colors.primary50,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
