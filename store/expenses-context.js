import { createContext } from "react";
import { useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2026-06-15"),
  },
  {
    id: "e2",
    description: "A pair of pants",
    amount: 49.05,
    date: new Date("2026-06-15"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 8.59,
    date: new Date("2026-06-15"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 29.99,
    date: new Date("2026-06-15"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2026-06-14"),
  },
  {
    id: "e6",
    description: "Groceries",
    amount: 72.34,
    date: new Date("2026-06-14"),
  },
  {
    id: "e7",
    description: "Coffee",
    amount: 4.5,
    date: new Date("2026-06-13"),
  },
  {
    id: "e8",
    description: "Movie tickets",
    amount: 24.0,
    date: new Date("2026-06-13"),
  },
  {
    id: "e9",
    description: "Gas",
    amount: 45.2,
    date: new Date("2026-06-12"),
  },
  {
    id: "e10",
    description: "Restaurant dinner",
    amount: 38.75,
    date: new Date("2026-06-12"),
  },
  {
    id: "e11",
    description: "Gym membership",
    amount: 35.0,
    date: new Date("2026-06-11"),
  },
  {
    id: "e12",
    description: "Phone bill",
    amount: 55.99,
    date: new Date("2026-06-10"),
  },
  {
    id: "e13",
    description: "Headphones",
    amount: 89.99,
    date: new Date("2026-06-09"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const id = new Date().toString() + Math.random().toString();
      return [...state, { ...action.payload, id }];
    }
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE": {
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatedExpense = {
        ...action.payload.expense,
        id: action.payload.id,
      };
      return [
        ...state.slice(0, updatableExpenseIndex),
        updatedExpense,
        ...state.slice(updatableExpenseIndex + 1),
      ];
    }
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
