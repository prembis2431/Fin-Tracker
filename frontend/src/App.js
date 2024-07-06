import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./components/Orb/Orb";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Expenses from "./components/Expenses/Expenses";
import Incomes from "./components/Incomes/Incomes";
import { useGlobalContext } from "./context/GlobalContext";
import ViewTransactions from "./components/ViewTransactions/ViewTransactions";
import Authentication from "./components/Authentication/Authentication";

function App() {
  const [active, setActive] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const global = useGlobalContext();

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") == "true") {
      // setActive(1);
      setIsAuthenticated(true);
      setActive(Number(localStorage.getItem("active")));
    }
    console.log(active);
  });

  const handleAuthSuccess = (user) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userName", `${user}`);
    setActive(1);
    localStorage.setItem("active", "1");
    setUserName(user);
  };

  const displayData = () => {
    switch (active) {
      case 0:
        return <Authentication handleAuthSuccess={handleAuthSuccess} />;
      case 1:
        console.log("1");
        return isAuthenticated && <Dashboard />;
      case 2:
        console.log("2", isAuthenticated);
        return isAuthenticated ? <ViewTransactions /> : "";
      case 3:
        console.log("3");
        return isAuthenticated && <Incomes />;
      case 4:
        console.log("4");
        return isAuthenticated && <Expenses />;
      default:
        console.log("5");
        return isAuthenticated && <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        {localStorage.getItem("isAuthenticated") == "true" ? (
          <>
            <Navigation
              active={active}
              setActive={setActive}
              userName={userName}
              setIsAuthenticated={setIsAuthenticated}
            />
            <main>{displayData()}</main>
          </>
        ) : (
          <>
            <main>{displayData()}</main>{" "}
          </>
        )}
        {/* <Navigation active={active} setActive={setActive} />
            <main>{displayData()}</main> */}

        {/* )} */}
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
