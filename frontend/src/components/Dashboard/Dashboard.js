import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "../Chart/Chart";
import { dollar } from "../../utils/icons";
import { useGlobalContext } from "../../context/GlobalContext";
import History from "../History/History";

const Dashboard = () => {
  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    getIncomes,
    getExpenses,
    incomes,
    expenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="charts-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expenses</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .charts-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          margin-bottom: 1rem;
          p {
            font-size: 2rem;
            font-weight: 500;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.8;
            font-size: 3rem;
       
          }
        }
      }
    }
    }
  }
`;
export default Dashboard;
