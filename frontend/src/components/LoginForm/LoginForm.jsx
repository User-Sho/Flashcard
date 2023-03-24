import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";

import { login, reset } from "../../features/auth/authSlice";
import { closeForm } from "../../features/modal/modalSlice";
import { Spinner } from "../../components";
import "./LoginForm.css";

const LoginForm = (props) => {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      dispatch(closeForm());
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
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
    <div
      className={`login__modal ${props.modal ? "open-modal" : "close-modal"}`}
    >
      <form onSubmit={onSubmit} className="login__form animate">
        <h3 className="login__title">Success awaits you.</h3>
        <fieldset className="login__fieldset">
          <legend>Email</legend>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            required="required"
            placeholder="Enter your email."
            onChange={onChange}
            autoFocus
          />
        </fieldset>
        <fieldset className="login__fieldset">
          <legend>Password</legend>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required="required"
            placeholder="Enter your password."
            onChange={onChange}
          />
        </fieldset>
        <button type="submit" onClick={onSubmit} className="login__submit-btn">
          Log in
        </button>
        <div
          onClick={() => dispatch(closeForm())}
          className="login__modal-close"
        >
          <CgClose />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
