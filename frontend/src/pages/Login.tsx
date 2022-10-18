import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
import Spinner from "../components/Spinner";

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

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => {
      return state.auth;
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

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
            id="passwor"
            name="password"
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
