import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  const amountChangeHandler = (value) => {
    console.log(value);
  };
  const dateChangeHandler = (value) => {
    console.log(value);
  };
  const descriptionChangeHandler = (value) => {
    console.log(value);
  };
  return (
    <View>
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: amountChangeHandler,
        }}
      />
      <Input
        label="Date"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: dateChangeHandler,
        }}
      />
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: descriptionChangeHandler,
          multiline: true,
          maxLength: 50,
        }}
      />
    </View>
  );
}

export default ExpenseForm;
