import axios from "axios";

const BACKEND_URL = "https://chloe-react-native-default-rtdb.firebaseio.com/";

export function storeExpense(expenseData) {
  axios.post(BACKEND_URL + "expenses.json", expenseData);
}
