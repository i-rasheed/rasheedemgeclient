import React, { useState, useContext } from "react";
import UserContext from "../../context/userContext";
import Axios from "axios";
import Message from "../../components/Message/Message";
import { useNavigate } from "react-router-dom";

const initialValues = {
  displayName: "",
  email: "",
  password: "",
  passwordCheck: "",
};

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { setUserData } = useContext(UserContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const clearError = () => {
    setError(undefined);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await Axios.post(`${REACT_APP_BACKEND_URL}/users/register`, values);
      setIsLoading(true);
      const loginRes = await Axios.post(
        `${REACT_APP_BACKEND_URL}/users/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      navigate("/log");
    } catch (error) {
      setIsLoading(false);
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      setError(message);
    }
  };

  let word;
  if (isLoading) {
    word = "loading..";
  } else {
    word = "Submit";
  }

  return (
    <div className="add-expense-wrapper">
      <h3>Register</h3>
      {error && <Message message={error} clearError={clearError} />}
      <form onSubmit={submitHandler}>
        <div class="form-group">
          <label htmlFor="title">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleInputChange}
            value={values.name}
            id="name"
            placeholder="Enter name"
          />
        </div>
        <div class="form-group">
          <label htmlFor="expense">Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={handleInputChange}
            value={values.email}
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label htmlFor="type">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleInputChange}
            value={values.password}
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div class="form-group">
          <label htmlFor="type">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="passwordCheck"
            onChange={handleInputChange}
            value={values.passwordCheck}
            id="passwordCheck"
            placeholder="Retype password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {word}
        </button>
      </form>
    </div>
  );
}
