import React, { useContext } from "react";
import { appState } from "../../App";
import Layout from "../../Component/layout/Layout";
import style from "./home.module.css";
import Question from "../../Component/question/Question";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Home() {
  const { user } = useContext(appState);
  const navigate = useNavigate();

 useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true }); // 👈 Redirect to login/landing
    }
  }, [navigate]);  
  
  if (!user) return <div>Loading...</div>;
  
  return (
    <Layout>
      <div>
        <div className={style.container}>
          <Link to='/ask-question' className={style.btn}> Ask Question</Link>
          <div>
            <h2>Welcome, {user.username}</h2>
          </div>
        </div>
        <div className={style.title}><h1>Question</h1></div>
        <Question/>
      </div>
    </Layout>
  );
}

export default Home;
