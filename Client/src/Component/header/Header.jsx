import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import logo from "../../Resource/img/evangadi_log.png";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className={styles.header}>
      <Link to="/home" className={styles.logoContainer}>
        <img src={logo} alt="Evangadi Logo" className={styles.logo} />
      </Link>
      <nav className={styles.navLinks}>
        {/* Home link for authenticated users */}
        {token && (
          <Link to="/home" className={styles.link} >
            Home
          </Link>
        )}

        <button
          className={styles.link}
          onClick={() => navigate("/how-it-works")}
        >
          How it Works
        </button>

        {!token ? (
          <>
            <button
              className={styles.signInBtn}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
            <button
              className={styles.signUpBtn}
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
          </>
        ) : (
          <button className={styles.logoutBtn} onClick={handleLogout}>
            LOGOUT
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
