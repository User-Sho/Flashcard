import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";

import { register, reset } from "../../features/auth/authSlice";

import { Spinner, LoginForm } from "../../components";
import "./Register.css";

const Register = () => {
  const { modal } = useSelector((state) => state.form);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pwConfirm: "",
  });

  const { name, email, password, pwConfirm } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== pwConfirm) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="registration__title">
        <h1>
          <FaUser />
          User Registration
        </h1>
        <p>Please create an account.</p>
      </section>
      <section className="registration__form">
        <form onSubmit={onSubmit} className="form-container">
          <fieldset className="form-filedset">
            <legend htmlFor="name">User Name</legend>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your user name."
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </fieldset>
          <fieldset className="form-filedset">
            <legend htmlFor="email">Email</legend>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter your email."
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </fieldset>
          <fieldset className="form-filedset">
            <legend>Password</legend>
            <input
              type="password"
              className="form-control-pw"
              id="password"
              placeholder="Enter your password."
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </fieldset>
          <fieldset className="form-filedset">
            <legend>Confirm Password</legend>
            <input
              type="password"
              className="form-control-pw"
              id="pwConfirm"
              placeholder="Confirm your password."
              name="pwConfirm"
              value={pwConfirm}
              onChange={onChange}
              required
            />
          </fieldset>
          <div className="registration__submit">
            <button type="submit" className="registration__submit-btn" disabled>
              Submit
            </button>
          </div>
        </form>
      </section>
      {modal ? <LoginForm /> : ""}
    </>
  );
};

export default Register;
