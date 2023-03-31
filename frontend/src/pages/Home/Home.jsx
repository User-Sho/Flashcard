import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../../features/auth/authSlice";
import { Spinner, Flashcard } from "../../components";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (user) {
      if (user.exp * 1000 <= Date.now()) {
        dispatch(logout());
        dispatch(reset());
        navigate("/login");
        return;
      }
    }
  }, [user, navigate, dispatch]);

  if (!user) {
    return <Spinner />;
  }

  return (
    <>
      {user.exp * 1000 <= Date.now() ? (
        <>
          <div className="home__token-expired">
            <h3>You must've studied so hard! Great job!</h3>
            <h3>
              But you know, your access token has just expired. Please take a
              good break and log in back again 😁
            </h3>
            <br />
            <h3>Qramming Team</h3>
          </div>
        </>
      ) : (
        <>
          <div className="home__greet-user">
            <h3>Hi, {user && user.name} ;)</h3>
          </div>

          <Flashcard name={user.name} />
        </>
      )}
    </>
  );
};

export default Home;
