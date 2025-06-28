import React, { useRef } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link to handle URL updates
import styles from "./register.module.css";
import axios from "../../API/axiosConfig"; // ✅ Import axios for API requests

function Register({ visible }) {
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const { setShow } = visible || {};

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value.trim();
    const firstnameValue = firstnameDom.current.value.trim();
    const lastnameValue = lastnameDom.current.value.trim();
    const emailValue = emailDom.current.value.trim();
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      alert("Please provide all information");
      return;
    }

    try {
      await axios.post("/user/register", {
        user_name: usernameValue,
        first_name: firstnameValue,
        last_name: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });
      alert("Registration Successful! Switching to Login...");
      setShow?.(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      alert(errorMessage); 
      // console.log("Error:", errorMessage);
    }
    
  }

  return (
    <div className={styles.registerCard}>
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input ref={usernameDom} type="text" placeholder="Username" required />
        <input
          ref={firstnameDom}
          type="text"
          placeholder="First Name"
          required
        />
        <input ref={lastnameDom} type="text" placeholder="Last Name" required />
        <input ref={emailDom} type="email" placeholder="Email" required />
        <input
          ref={passwordDom}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>

   
      <Link
        to="/login"
        onClick={() => handleToggl(false)}
        className={styles.toggleLogin}
      >
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;
