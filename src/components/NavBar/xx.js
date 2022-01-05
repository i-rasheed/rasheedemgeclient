style={{ textDecoration: "none" }}

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("auth-token", "");
    localStorage.setItem("userExpense", "");
    setUserData({
      token: undefined,
      user: undefined,
    });
    navigate("/");
  };
  return (
    <div>
      {userData.user ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link style={{ textDecoration: "none" }} to="/">
              <a className="navbar-brand" href="#">
                Expense Tracker
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav  align-items-center">
                <Link style={{ textDecoration: "none" }} to="/log">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">
                      Your Expenses
                    </a>
                  </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/add">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Expense
                    </a>
                  </li>
                </Link>
                <Link to="/">
                  <li className="nav-item">
                    <button
                      onClick={logout}
                      className="nav-link btn btn-primary"
                      href="#"
                    >
                      logout
                    </button>
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link style={{ textDecoration: "none" }} to="/">
              <a className="navbar-brand" href="#">
                Expense Tracker
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav justify-content-end">
                <Link style={{ textDecoration: "none" }} to="/add">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Expense
                    </a>
                  </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/register">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Register
                    </a>
                  </li>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/login">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Login
                    </a>
                  </li>
                </Link>
              </ul>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}

  // "start": "serve -s build",
