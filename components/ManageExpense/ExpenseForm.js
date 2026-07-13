import { View, Text, StyleSheet, Pressable } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { CATEGORIES, DEFAULT_CATEGORY } from "../../constants/categories";

function ExpenseForm({ onCancel, onSubmit, isEditing, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: { value: defaultValues ? defaultValues.amount.toString() : "", isValid: true },
    date: { value: defaultValues ? getFormattedDate(defaultValues.date) : "", isValid: true },
    description: { value: defaultValues ? defaultValues.description : "", isValid: true },
    category: {
      value: defaultValues?.category || DEFAULT_CATEGORY,
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return { ...curInputs, [inputIdentifier]: { value: enteredValue, isValid: true } };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      category: inputs.category.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const categoryIsValid = CATEGORIES.some((item) => item.id === expenseData.category);

    if (!amountIsValid || !dateIsValid || !descriptionIsValid || !categoryIsValid) {
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
          category: { value: curInputs.category.value, isValid: categoryIsValid },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid ||
    !inputs.category.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          maxLength: 50,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <View style={styles.categoryContainer}>
        <Text style={[styles.categoryLabel, !inputs.category.isValid && styles.invalidLabel]}>
          Category
        </Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((category) => {
            const isSelected = inputs.category.value === category.id;
            return (
              <Pressable
                key={category.id}
                onPress={() => inputChangeHandler("category", category.id)}
                style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
              >
                <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextSelected]}>
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your entered values</Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  categoryContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 8,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  categoryChipSelected: {
    backgroundColor: GlobalStyles.colors.accent500,
  },
  categoryChipText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 13,
    fontWeight: "600",
  },
  categoryChipTextSelected: {
    color: GlobalStyles.colors.primary800,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
