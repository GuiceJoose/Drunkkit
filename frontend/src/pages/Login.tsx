import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  interface IUserLogin {
    email: string;
    password: string;
  }
  const [loginFormData, setLoginFormData] = useState<IUserLogin>({
    email: "",
    password: "",
  });

  const { email, password } = loginFormData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Log in
        </h1>
        <p>Please Sign in</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-item"
            id="email"
            name="email"
            placeholder="Please enter your email address"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            className="form-item"
            id="password1"
            name="password1"
            placeholder="Please enter your password"
            onChange={handleChange}
          ></input>
          <button type="submit" className="form-btn">
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
