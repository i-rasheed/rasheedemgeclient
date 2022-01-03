import React, { useState, useContext } from "react";
import Axios from "axios";
import UserContext from "../../context/userContext";
import Message from "../../components/Message/Message";

const initialValues = {
  title: "",
  expense: "",
  type: "",
  amount: "",
  date: "",
};

export default function AddExpense() {
  const [values, setValues] = useState(initialValues);
  const [expenseArr, setExpenseArr] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();

  const { userData } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const clearMsg = () => {
    setMsg(undefined);
  };

  const clearError = () => {
    setError(undefined);
  };
  let token = localStorage.getItem("auth-token");
  const submitHandler = async (e) => {
    e.preventDefault();

    if (userData.token) {
      try {
        setIsLoading(true);
        await Axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/expense`,
          values,
          {
            headers: { "x-auth-token": token },
          }
        );
        setMsg("Added");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        error.response.data.msg && setError(error.response.data.msg);
      }
    } else {
      if (
        !values.title ||
        !values.expense ||
        !values.type ||
        !values.amount ||
        !values.date
      )
        return setError("All fields are required!");
      setExpenseArr((currentArray) => [...currentArray, values]);

      localStorage.setItem("userExpense", JSON.stringify(expenseArr));
      setMsg("Added");
      setValues(initialValues);
    }
  };

  let word;
  if (isLoading) {
    word = "loading..";
  } else {
    word = "Add";
  }

  return (
    <div className="add-expense-wrapper">
      {msg && <Message success={msg} clearMsg={clearMsg} />}
      {error && <Message message={error} clearError={clearError} />}
      <h3>Add Expense</h3>
      <form onSubmit={submitHandler}>
        <div class="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={handleInputChange}
            value={values.title}
            id="title"
            placeholder="Enter title"
          />
        </div>
        <div class="form-group">
          <label htmlFor="expense">Expense</label>
          <input
            type="text"
            className="form-control"
            name="expense"
            onChange={handleInputChange}
            value={values.expense}
            id="expense"
            placeholder="Enter expense"
          />
        </div>
        <div class="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            name="type"
            onChange={handleInputChange}
            value={values.type}
            id="type"
            placeholder="Enter type"
          />
        </div>
        <div class="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            onChange={handleInputChange}
            value={values.amount}
            id="amount"
            placeholder="Enter amount"
          />
        </div>
        <div class="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            onChange={handleInputChange}
            value={values.date}
            id="date"
            placeholder="Enter date"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {word}
        </button>
      </form>
    </div>
  );
}
