import React, { useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Button from "../Button/Button";

const Authentication = () => {
  // { onAuthSuccess }
  const [isSignInForm, setIsSignInForm] = useState(true);

  const handleLogin = (e) => {
    // Once authenticated, call onAuthSuccess
    e.preventDefault();
    // onAuthSuccess();
  };

  const ToggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <AuthenticationStyled>
      <InnerLayout>
        <div className="whole-container">
          <form className="formContainer">
            <h1>{isSignInForm ? "Sign in" : "Sign up"}</h1>
            {!isSignInForm && <input type="text" placeholder="Name" />}
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <div className="submit-btn">
              <Button
                name={isSignInForm ? "Sign in" : "Sign up"}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent"}
                color={"#fff"}
                onClick={handleLogin}
              />
            </div>
          </form>
          <div className="last-container">
            <p>{isSignInForm ? "New to Fin-Tracker" : "Already on it?"}</p>
            <p className="join-or-sign" onClick={ToggleSignInForm}>
              {isSignInForm ? "Join now" : "Sign in"}
            </p>
          </div>
        </div>
      </InnerLayout>
    </AuthenticationStyled>
  );
};

const AuthenticationStyled = styled.div`

  .formContainer {
    display: flex;
    flex-direction: column;
    width: 30%;
    gap: 1rem;
    input {
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      &::placeholder {
        color: rgba(34, 34, 96, 0.4);
      }
    }
    .submit-btn {
      button {
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        &:hover {
          background: var(--color-green) !important;
        }
      }
    }
  }

  .last-container {
  margin-top: 1rem;
    display: flex;
    width: 30%;
    gap: 0.5rem;
    font-family: inherit;
    font-size: inherit;

    .join-or-sign{
    cursor: pointer;
    color: blue;

    }
    .join-or-sign:hover{
    color: rgb(0, 0, 139);
    }
  }
`;
export default Authentication;
