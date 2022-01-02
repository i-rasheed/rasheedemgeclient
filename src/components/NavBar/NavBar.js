import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("auth-token", "");
    // localStorage.setItem("userExpense", "");
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
            <div className="container-fluid">
              <Link style={{ textDecoration: "none" }} to="/">
                <a className="navbar-brand" href="#">
                  Expense Tracker
                </a>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end "
                id="navbarNav"
              >
                <ul className="navbar-nav align-items-center">
                  <Link style={{ textDecoration: "none" }} to="/">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Home
                      </a>
                    </li>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/log">
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Expenses List
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
                  <Link style={{ textDecoration: "none" }} to="/">
                    <button
                      onClick={logout}
                      className="nav-item btn btn-primary"
                    >
                      <a className="nav-link" href="#">
                        logout
                      </a>
                    </button>
                  </Link>
                </ul>
              </div>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link style={{ textDecoration: "none" }} to="/">
                <a className="navbar-brand" href="#">
                  Expense Tracker
                </a>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <Link style={{ textDecoration: "none" }} to="/">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Home
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
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
