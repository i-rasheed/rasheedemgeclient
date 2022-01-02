import React, { useState, useEffect } from "react";
import AddExpense from "./pages/AddExpense/AddExpense";
import ExpenseLog from "./pages/ExpenseLog/ExpenseLog";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserContext from "./context/userContext";
import Axios from "axios";
import EditExpense from "./pages/EditExpense/EditExpense";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/tokenIsValid`,
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <NavBar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/add" element={<AddExpense />} exact />
            <Route path="/log" element={<ExpenseLog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/expense/:id/edit" element={<EditExpense />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
