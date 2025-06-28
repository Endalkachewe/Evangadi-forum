import { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axios from "./API/axiosConfig";
import QuesAndAnw from "./pages/QuesAndAns/QuesAndAnw";
import AskQuestion from "./pages/askQuestion/AskQuestion";
import Landing from './pages/landing/Landing'
import Layout from "./Component/layout/Layout";

export const appState = createContext();

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  async function checkUser() {
    try {
      const { data } = await axios.get("/user/checkUser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
     
      setUser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/");
    }
  }

  useEffect(() => {
    checkUser();
   
  }, [token]);

  return (
    <appState.Provider value={{ user, setUser }}>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Landing showLogin={true} />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Landing showLogin={true} />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Landing showLogin={false} />
            </Layout>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/question/:question_id/answer" element={<QuesAndAnw />} />
        <Route path="/ask-question" element={<AskQuestion />} />
      </Routes>
    </appState.Provider>
  );
}

export default App;
