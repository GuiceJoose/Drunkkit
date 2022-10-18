import React, { useState, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { FaUser } from "react-icons/fa";
import { AppDispatch } from "../app/store";
import Spinner from "../components/Spinner";

const Register = () => {
  interface UserInput {
    name: string;
    email: string;
    password1: string;
    password2: string;
  }
  const [signUpFormData, setSignUpFormData] = useState<UserInput>({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, email, password1, password2 } = signUpFormData;

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
    setSignUpFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password1 !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password: password1,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Please enter your name"
            onChange={handleChange}
          ></input>
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
          <input
            type="password"
            className="form-item"
            id="password2"
            name="password2"
            placeholder="Please confirm your password"
            onChange={handleChange}
          ></input>
          <button type="submit" className="form-btn">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
