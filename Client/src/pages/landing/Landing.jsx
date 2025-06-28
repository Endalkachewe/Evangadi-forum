import React from "react";
import classes from "./landing.module.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import About from "./About";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing({ showLogin }) {
    const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", { replace: true }); // 👈 Redirect to login/landing
    }
  }, [navigate]);  
 
  
  return (
    <div className={classes.landingWrapper}>
      <main className={classes.mainContent}>
        <div className={classes.loginSection}>
          {showLogin ? <Login /> : <Register />}
        </div>
        <About /> {/* About is always displayed */}
      </main>
    </div>
  );
}

export default Landing;
