import { createContext, useEffect, useReducer, useState } from "react";
import { fetchExpenses } from "../util/http";

export const ExpensesContext = createContext({
  expenses: [],
  isLoading: true,
  error: null,
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date, category }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date, category }) => {},
  clearError: () => {},
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadExpenses() {
      setIsLoading(true);
      setError(null);
      try {
        const expenses = await fetchExpenses();
        dispatch({ type: "SET", payload: expenses });
      } catch {
        setError("Failed to fetch expenses");
      }
      setIsLoading(false);
    }
    loadExpenses();
  }, []);

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

  const clearError = () => {
    setError(null);
  };

  const value = {
    expenses: expensesState,
    isLoading,
    error,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
    clearError,
  };
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
