import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

import { logout, reset } from "../../features/auth/authSlice";
import { showForm, closeForm } from "../../features/modal/modalSlice";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(closeForm());
    navigate("/login");
  };

  return (
    <nav className="header__nav">
      <Link to="/">
        <h1 className="header__nav-title">Qramming</h1>
      </Link>

      <ul>
        {user ? (
          <>
            <li className="header__nav-login ">
              <button className="header__nav-logout" onClick={onLogout}>
                <FaSignOutAlt /> Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="header__nav-login mobile ">
              <button onClick={() => dispatch(showForm())}>
                <FaSignInAlt />
                Log in
              </button>
            </li>
            <li className="header__nav-register ">
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Header;
