import { View, Text, StyleSheet, Pressable, Platform, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "./Input";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../UI/Button";
import { getFormattedDate, parseFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";
import { CATEGORIES, DEFAULT_CATEGORY } from "../../constants/categories";

function ExpenseForm({ onCancel, onSubmit, isEditing, defaultValues }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [inputs, setInputs] = useState({
    amount: { value: defaultValues ? defaultValues.amount.toString() : "", isValid: true },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : getFormattedDate(new Date()),
      isValid: true,
    },
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

  function amountChangeHandler(enteredValue) {
    const sanitized = enteredValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setInputs((curInputs) => {
      return { ...curInputs, amount: { value: sanitized, isValid: true } };
    });
  }

  function dateChangeHandler(event, selectedDate) {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed" || !selectedDate) {
      return;
    }

    inputChangeHandler("date", getFormattedDate(selectedDate));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: parseFormattedDate(inputs.date.value),
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
      <View style={styles.titleRow}>
        <Ionicons name="wallet" size={28} color={GlobalStyles.colors.surface} />
        <Text style={styles.title}>Your Expense</Text>
      </View>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
            value: inputs.amount.value,
          }}
        />
        <View style={[styles.rowInput, styles.dateField]}>
          <View style={styles.labelRow}>
            <Ionicons
              name="calendar"
              size={14}
              color={!inputs.date.isValid ? GlobalStyles.colors.error500 : GlobalStyles.colors.surface}
            />
            <Text style={[styles.dateLabel, !inputs.date.isValid && styles.invalidLabel]}>Date</Text>
          </View>
          <Pressable
            onPress={() => setShowDatePicker((current) => !current)}
            style={[styles.dateButton, !inputs.date.isValid && styles.invalidInput]}
          >
            <Ionicons name="calendar-outline" size={18} color={GlobalStyles.colors.primary700} />
            <Text style={styles.dateButtonText}>{inputs.date.value}</Text>
          </Pressable>
        </View>
      </View>
      {showDatePicker && (
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={parseFormattedDate(inputs.date.value)}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={dateChangeHandler}
            themeVariant="light"
            accentColor={GlobalStyles.colors.primary500}
          />
          {Platform.OS === "ios" && (
            <Button style={styles.dateDoneButton} onPress={() => setShowDatePicker(false)}>
              Done
            </Button>
          )}
        </View>
      )}
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
        <View style={styles.labelRow}>
          <Ionicons
            name="pricetag"
            size={14}
            color={!inputs.category.isValid ? GlobalStyles.colors.error500 : GlobalStyles.colors.surface}
          />
          <Text style={[styles.categoryLabel, !inputs.category.isValid && styles.invalidLabel]}>
            Category
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {CATEGORIES.map((category) => {
            const isSelected = inputs.category.value === category.id;
            const chipColor = isSelected
              ? GlobalStyles.colors.accent500
              : GlobalStyles.colors.primary700;
            return (
              <Pressable
                key={category.id}
                onPress={() => inputChangeHandler("category", category.id)}
                style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
              >
                <Ionicons name={category.icon} size={16} color={chipColor} />
                <Text style={[styles.categoryChipText, isSelected && styles.categoryChipTextSelected]}>
                  {category.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
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
    marginTop: 24,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: GlobalStyles.colors.surface,
    textAlign: "center",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  dateField: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: GlobalStyles.colors.surface,
  },
  dateButton: {
    backgroundColor: GlobalStyles.colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
  },
  dateButtonText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary800,
    fontWeight: "600",
  },
  datePickerContainer: {
    marginHorizontal: 4,
    marginBottom: 8,
    backgroundColor: GlobalStyles.colors.surface,
    borderRadius: 18,
    overflow: "hidden",
    alignItems: "center",
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
  },
  dateDoneButton: {
    marginVertical: 8,
    minWidth: 120,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
    borderColor: GlobalStyles.colors.error500,
  },
  categoryContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: GlobalStyles.colors.surface,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: GlobalStyles.colors.surface,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary100,
  },
  categoryChipSelected: {
    backgroundColor: GlobalStyles.colors.accentSoft,
    borderColor: GlobalStyles.colors.accent500,
  },
  categoryChipText: {
    color: GlobalStyles.colors.primary700,
    fontSize: 13,
    fontWeight: "700",
  },
  categoryChipTextSelected: {
    color: GlobalStyles.colors.accent500,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: "600",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
