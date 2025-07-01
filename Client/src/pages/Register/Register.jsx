import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; //  Use `useNavigate` for redirection
import styles from "./register.module.css";
import axios from "../../API/axiosConfig"; // Import axios for API requests

function Register() {
  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const navigate = useNavigate(); // Navigation after successful registration

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
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("/users/register", {
        user_name: usernameValue,
        first_name: firstnameValue,
        last_name: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      alert("Registration Successful! Redirecting to Login...");
      navigate("/login"); //  Redirect to login after successful registration
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      alert(errorMessage);
    }
  }

  return (
    <div className={styles.registerCard}>
      <h2>Join the network</h2>
      <form onSubmit={handleSubmit}>
        <input ref={emailDom} type="email" placeholder="Email" required />
        <div className={styles.input_name}>
          <input
            ref={firstnameDom}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            ref={lastnameDom}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input ref={usernameDom} type="text" placeholder="Username" required />

        <input
          ref={passwordDom}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Agree and Join</button>
      </form>
      <div>
        I agree to <Link>privacy policy</Link> and <Link>terms of service</Link>
      </div>
      <Link to="/login" className={styles.toggleLogin}>
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;
