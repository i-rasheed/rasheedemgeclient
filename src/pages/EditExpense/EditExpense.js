import React, { useState, useEffect } from "react";
import Axios from "axios";
import Message from "../../components/Message/Message";
import { useParams, useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  expense: "",
  type: "",
  amount: "",
  date: "",
};

export default function EditExpense() {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState();

  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;
  let token = localStorage.getItem("auth-token");

  useEffect(() => {
    const getExpense = async () => {
      try {
        setIsLoading(true);
        const expenseRes = await Axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/expense/${id}/one`,
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(expenseRes.data.title);
        setIsLoading(false);
        setValues({
          title: expenseRes.data.title,
          expense: expenseRes.data.expense,
          type: expenseRes.data.type,
          amount: expenseRes.data.amount,
          date: expenseRes.data.date,
        });
      } catch (error) {
        setIsLoading(false);
        const message =
          error.response && error.response.data.msg
            ? error.response.data.msg
            : error.message;
        setError(message);
      }
    };
    getExpense();
  }, [id, token]);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await Axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/expense/${id}`,
        values,
        {
          headers: { "x-auth-token": token },
        }
      );
      setIsLoading(false);
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
      {msg && <Message success={msg} clearMsg={clearMsg} />}
      {error && <Message message={error} clearError={clearError} />}
      <h3>Edit Expense</h3>
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
            type="text"
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
