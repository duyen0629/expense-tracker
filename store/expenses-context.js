import { createContext } from "react";
import { useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date, category }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date, category }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET": {
      const inverted = action.payload.reverse();
      return inverted;
    }
    case "ADD": {
      return [action.payload, ...state];
    }
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE": {
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updatedExpense = {
        ...action.payload.expense,
        id: action.payload.id,
      };
      return [...state.slice(0, updatableExpenseIndex), updatedExpense, ...state.slice(updatableExpenseIndex + 1)];
    }
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, expense: expenseData } });
  };

  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
