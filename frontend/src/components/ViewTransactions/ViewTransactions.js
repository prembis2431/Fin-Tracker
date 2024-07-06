import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/GlobalContext";
import Button from "../Button/Button";

const ViewTransactions = () => {
  const { incomes, expenses } = useGlobalContext();
  const [groupedIncomes, setGroupedIncome] = useState({});
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [viewType, setViewType] = useState(""); // for main view, 'incomes' for income view, 'expenses' for expense view
  const [isMonthSelected, setIsMonthSelected] = useState(false); // false for month selection page, true for data page

  useEffect(() => {
    const groupedByMonth = (incomes) => {
      return incomes.reduce((acc, income) => {
        const date = new Date(income.date);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const key = `${month} ${year}`;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(income);
        return acc;
      }, {});
    };

    const groupedIncomes = groupedByMonth(incomes);
    const groupedExpenses = groupedByMonth(expenses);
    setGroupedIncome(groupedIncomes);
    setGroupedExpenses(groupedExpenses);
  }, [incomes, expenses]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
    setIsMonthSelected(true); // true when a month is selected
  };
  const handleHomeClick = () => {
    setSelectedMonth("");
    setViewType("");
    setIsMonthSelected(false); // Reset to false when going back to the main view
  };

  const handleBackClick = () => {
    setIsMonthSelected(false); // Set to false to return to the month selection page
  };

  const groupByDate = (incomes) => {
    return incomes.reduce((acc, income) => {
      const date = new Date(income.date).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(income);
      return acc;
    }, {});
  };

  return (
    <ViewTransactionsStyled>
      <InnerLayout>
        
        <h2 style={{ textAlign: "center" }}>Finance Tracker</h2>
      {console.log("value", viewType)}
        {viewType === "" ? (
          <div className="inc-exp-btn">
            <Button
              name={"Incomes"}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-green"}
              color={"#fff"}
              onClick={() => setViewType("incomes")}
            />

            <Button
              name={"Expenses"}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
              onClick={() => setViewType("expenses")}
            />
          </div>
        ) : (
          <>
            <Button
              name={"Home"}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"var(--color-accent"}
              color={"#fff"}
              onClick={handleHomeClick}
            />

            <h3 style={{ marginTop: "15px" }}>
              {selectedMonth}{" "}
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </h3>
          </>
        )}
        {viewType !== "" && !isMonthSelected ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {months.map((month, index) => (
              <div
                key={index}
                style={{
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                }}
                onClick={() => handleMonthClick(month)}
              >
                {month}
              </div>
            ))}
          </div>
        ) : (
          viewType !== "" &&
          selectedMonth && (
            <div style={{ marginTop: "30px" }}>
              <button
                style={{
                  outline: "none",
                  border: "none",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "20px",
                  width: "100px",
                  background: "blue",
                  color: "#fff",
                  gap: ".5rem",
                  cursor: "pointer",
                  transition: "all .4s ease-in-out",
                }}
                onClick={handleBackClick}
              >
                Back
              </button>
              <h3>
                {selectedMonth} -{" "}
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </h3>
              {viewType === "incomes"
                ? Object.entries(groupedIncomes).map(
                    ([month, incomes]) =>
                      month.startsWith(selectedMonth) && (
                        <div key={month}>
                          {Object.entries(groupByDate(incomes)).map(
                            ([date, incomesOnDate]) => (
                              <div
                                key={date}
                                style={{
                                  border: "1px solid #ccc",
                                  marginBottom: "10px",
                                  marginTop: "10px",
                                  padding: "10px",
                                  borderRadius: "4px",
                                }}
                              >
                                <h4>{date}</h4>
                                {incomesOnDate.map((income) => (
                                  <div
                                    key={income.id}
                                    style={{
                                      border: "1px solid #ddd",
                                      marginBottom: "5px",
                                      marginTop: "10px",
                                      padding: "10px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <p>Title: {income.title}</p>
                                    <p>Amount: ${income.amount}</p>
                                    <p>Category: {income.category}</p>
                                  </div>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      )
                  )
                : Object.entries(groupedExpenses).map(
                    ([month, expenses]) =>
                      month.startsWith(selectedMonth) && (
                        <div key={month}>
                          {Object.entries(groupByDate(expenses)).map(
                            ([date, expensesOnDate]) => (
                              <div
                                key={date}
                                style={{
                                  border: "1px solid #ccc",
                                  marginBottom: "10px",
                                  marginTop: "10px",
                                  padding: "10px",
                                  borderRadius: "4px",
                                }}
                              >
                                <h4>{date}</h4>
                                {expensesOnDate.map((expense) => (
                                  <div
                                    key={expense.id}
                                    style={{
                                      border: "1px solid #ddd",
                                      marginBottom: "5px",
                                      marginTop: "10px",
                                      padding: "10px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    <p>Title: {expense.title}</p>
                                    <p>Amount: ${expense.amount}</p>
                                    <p>Category: {expense.category}</p>
                                  </div>
                                ))}
                              </div>
                            )
                          )}
                        </div>
                      )
                  )}
            </div>
          )
        )}
      </InnerLayout>
    </ViewTransactionsStyled>
  );
};

const ViewTransactionsStyled = styled.div`
  .inc-exp-btn {
    display: flex;
    gap: 10rem;
    justify-content: center;
    margin: 3rem;
  }
`;

export default ViewTransactions;
