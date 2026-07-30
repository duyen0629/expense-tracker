import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import { getCategoryIcon, getCategoryLabel } from "../../constants/categories";

function CategoryBreakdownItem({ categoryId, total, count, percentOfTotal, onPress }) {
  return (
    <Pressable
      onPress={() => onPress?.(categoryId)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={getCategoryIcon(categoryId)} size={20} color={GlobalStyles.colors.primary500} />
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>{getCategoryLabel(categoryId)}</Text>
        <Text style={styles.meta}>
          {count} expense{count === 1 ? "" : "s"} · {percentOfTotal}% of total
        </Text>
      </View>
      <Text style={styles.amount}>${total.toFixed(2)}</Text>
      <Ionicons name="chevron-forward" size={18} color={GlobalStyles.colors.gray500} />
    </Pressable>
  );
}

function CategoryBreakdownList({ categories, total, onCategoryPress }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>By category</Text>
      <View style={styles.list}>
        {categories.map((item) => {
          const percentOfTotal =
            total > 0 ? Math.round((item.total / total) * 100) : 0;

          return (
            <CategoryBreakdownItem
              key={item.categoryId}
              categoryId={item.categoryId}
              total={item.total}
              count={item.count}
              percentOfTotal={percentOfTotal}
              onPress={onCategoryPress}
            />
          );
        })}
      </View>
    </View>
  );
}

export default CategoryBreakdownList;

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: GlobalStyles.colors.primary50,
    letterSpacing: 0.3,
  },
  list: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.primary50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: GlobalStyles.colors.primary800,
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    fontWeight: "600",
    color: GlobalStyles.colors.gray500,
  },
  amount: {
    fontSize: 16,
    fontWeight: "800",
    color: GlobalStyles.colors.primary500,
    marginRight: 4,
  },
});
