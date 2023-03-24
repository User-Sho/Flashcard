import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillFire } from "react-icons/ai";

import { showForm } from "../../features/modal/modalSlice";
import { Quote, LoginForm } from "../../components";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const { modal } = useSelector((state) => state.form);

  return (
    <>
      <Quote />
      <div className="login__container">
        <h3>Fired up?</h3>
        <button
          type="button"
          onClick={() => dispatch(showForm())}
          className="show-modal"
        >
          <p> Log in</p>
          <div>
            <AiFillFire />
          </div>
        </button>
      </div>

      {modal ? <LoginForm /> : ""}
    </>
  );
};

export default Login;
