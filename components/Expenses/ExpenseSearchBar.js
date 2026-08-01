import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";

function ExpenseSearchBar({ value, onChangeText }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={GlobalStyles.colors.primary700} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search expenses…"
        placeholderTextColor={GlobalStyles.colors.gray500}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} hitSlop={8} style={styles.clearButton}>
          <Ionicons name="close-circle" size={18} color={GlobalStyles.colors.gray500} />
        </Pressable>
      )}
    </View>
  );
}

export default ExpenseSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.55)",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: GlobalStyles.colors.primary800,
    padding: 0,
  },
  clearButton: {
    padding: 2,
  },
});
