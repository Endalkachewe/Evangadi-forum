import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axiosConfig";
import classes from "./login.module.css";
import { appState } from "../../App";
import { BiHide, BiShow } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(appState);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const emailValue = emailRef.current.value.trim();
    const passwordValue = passwordRef.current.value;

    if (!emailValue || !passwordValue) {
      setErrorMessage("Please provide all required information.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_name", response.data.user_name); // Store user data
        setUser(response.data.user_name); // Update app state
        navigate("/home"); // Redirect to home page
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(
        error.response?.data?.message || "Something went wrong! Try again."
      );
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.loginCard}>
      <h1 className={classes.loginTitle}>Login to your account</h1>
      <p className={classes.loginSubText}>
        Don’t have an account?
        <Link to="/register" className={classes.link}>
          Create a new account
        </Link>
      </p>
      {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={classes.signInForm}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your email"
          className={classes.inputField}
        />
        <div className={classes.passwordWrapper}>
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.inputField}
          />
          <button
            type="button"
            className={classes.eyeIcon}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}
          </button>
        </div>

        <button type="submit" className={classes.loginBtn}>
          {isLoading ? <ClipLoader size={12} color="white" /> : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default Login;
