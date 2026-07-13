import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ style, invalid, label, textInputConfig }) {
  const inputStyles = [styles.input];
  if (textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} placeholderTextColor={GlobalStyles.colors.gray500} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: GlobalStyles.colors.surface,
    marginBottom: 6,
  },
  input: {
    backgroundColor: GlobalStyles.colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    fontSize: 16,
    color: GlobalStyles.colors.primary800,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
    borderColor: GlobalStyles.colors.error500,
  },
});
