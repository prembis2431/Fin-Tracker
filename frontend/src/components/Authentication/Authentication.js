import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import Button from "../Button/Button";
import { BASE_URL } from "../../context/GlobalContext";

const Authentication = ({handleAuthSuccess}) => {
  
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});


  const handleLogin = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;

    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      console.log(result);
      if (response.status === 200) {
        console.log(result.message);
        handleAuthSuccess(response.data.name);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
console.log("handleSignup");
    try {
      const response = await axios.post(
        `${BASE_URL}signup`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      console.log(result);
      if (response.status === 201) {
       setIsSignInForm(true);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  const validateForm = () => {
    const errors = {};
    if (!isSignInForm && !formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be 8 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    if (isSignInForm) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  const ToggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrors({});
  };

  return (
    <AuthenticationStyled>
      <InnerLayout>
        <div className="whole-container">
          <form className="formContainer" onSubmit={handleSubmit}>
            <h1>{isSignInForm ? "Sign in" : "Sign up"}</h1>
            {errors.form && <p className="error">{errors.form}</p>}
            {!isSignInForm && (
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="submit-btn">
              <Button
                name={isSignInForm ? "Login" : "Sign up"}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"var(--color-accent)"}
                color={"#fff"}
                type="submit"
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
    .error {
      color: red;
      font-size: 0.8rem;
    }
  }

  .last-container {
    margin-top: 1rem;
    display: flex;
    width: 30%;
    gap: 0.5rem;
    font-family: inherit;
    font-size: inherit;

    .join-or-sign {
      cursor: pointer;
      color: blue;
    }
    .join-or-sign:hover {
      color: rgb(0, 0, 139);
    }
  }
`;


export default Authentication;
