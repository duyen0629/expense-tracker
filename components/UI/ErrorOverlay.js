import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="alert-circle" size={36} color={GlobalStyles.colors.error500} />
      </View>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onConfirm}>Try Again</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.background,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.error50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  text: {
    color: GlobalStyles.colors.surface,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
    color: GlobalStyles.colors.primary50,
    lineHeight: 20,
  },
});
