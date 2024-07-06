// Global context in general, refers to a mechanism for
// managing and sharing state or data across multiple components.
// It's especially useful when you have data that many components in your application need access to,
// without passing props manually through each level of the component tree.

// React's context API allows you to manage global state and share data across components
// without having to pass props manually at every level of the component tree
import React, { useContext, useState } from "react";
import axios from "axios";

export const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  // {children} is a special prop that React provides to components.
  // It represents the content between the opening and closing tags of a component.
  // In this case, it represents the children components of GlobalProvider.

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // calculating incomes-
  const addIncome = async (income) => {
    // this addIncome method will be responsible to send the items
    // to the database.

    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message);
      });

    {
      /* add-income is the endpoints, 
    and 'income' is the payload after the payload
    like whatever value we recieve from the user */
    }

    getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`);

    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`);

    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });
    return totalIncome;
  };

  // calculating expenses-
  const addExpense = async (expense) => {
    // this addExpense method will be responsible to send the items
    // to the database.
    const response = await axios
      .post(`${BASE_URL}add-expense`, expense)
      .catch((err) => {
        setError(err.response.data.message);
      });

    {
      /* add-expense is the endpoints, 
    and 'income' is the payload after the payload
    like whatever value we recieve from the user */
    }

    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`);

    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);

    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((expense) =>{
        totalIncome = totalIncome + expense.amount
    })

    return totalIncome;
}

const totalBalance = () =>{

  return totalIncome() - totalExpenses();
}

const transactionHistory = () =>{

  const history = [...incomes, ...expenses];
  history.sort((a,b) =>{

    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return history.slice(0,5)
}
  // const globalState = {
  //     incomes,
  //     expenses,
  //     error,
  //     addIncome,
  //   };
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        expenses,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

{
  /*<GlobalContext.Provider>: This is where the global state provided by GlobalContext will be available to all its descendant components. 
The Provider component from the GlobalContext context object is used to wrap the children components.*/
}

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
