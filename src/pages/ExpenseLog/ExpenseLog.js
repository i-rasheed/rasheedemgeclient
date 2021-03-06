import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Message from "../../components/Message/Message";
import Loader from "react-loader-spinner";

function ExpenseLog() {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState();
  const clearMsg = () => {
    setMsg(undefined);
  };

  const clearError = () => {
    setError(undefined);
  };

  const navigate = useNavigate();

  const myPost = localStorage.getItem("userExpense")
    ? JSON.parse(localStorage.getItem("userExpense"))
    : null;
  console.log(myPost);
  let token = localStorage.getItem("auth-token");

  // useEffect(() => {
  const postExpenses = async () => {
    try {
      const postRes = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/expense/many/${myPost}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      console.log(postRes.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   postExpenses();
  // }, [myPost, token]);

  useEffect(() => {
    postExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getExpenses = async () => {
    try {
      setIsLoading(true);
      const expenseRes = await Axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/expense/mine/all`,
        {
          headers: { "x-auth-token": token },
        }
      );
      if (expenseRes.data.length === 0) {
        setMsg("You have not added any expense");
      }
      setIsLoading(false);
      console.log(expenseRes);
      setExpenses(expenseRes.data);
    } catch (error) {
      setIsLoading(false);
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      setError(message);
    }
  };

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempExpense = expenses.map((ex) => {
        return { ...ex, isChecked: checked };
      });
      setExpenses(tempExpense);
    } else {
      let tempExpense = expenses.map((ex) =>
        ex._id === name ? { ...ex, isChecked: checked } : ex
      );
      setExpenses(tempExpense);
    }
  };

  const deleteExpenseByIds = async () => {
    let arrayIds = [];
    expenses.forEach((d) => {
      if (d.isChecked) {
        arrayIds.push(d._id);
      }
      console.log(arrayIds);
    });
    try {
      setIsLoading(true);
      await Axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/expense/many/${arrayIds}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      setIsLoading(false);
      getExpenses();
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      setError(message);
    }
  };

  const updateHandler = (id) => {
    navigate(`/expense/${id}/edit`);
  };

  return (
    <div className="expense-log-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <button
                className="btn btn-danger"
                onClick={() => deleteExpenseByIds()}
              >
                delete
              </button>
            </th>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Expense</th>
            <th scope="col">Type</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">
              <div className="form-check">
                <input
                  type="checkbox"
                  name="allSelect"
                  className="label-checkbox"
                  checked={!expenses.some((user) => user?.isChecked !== true)}
                  onChange={handleChange}
                />
                <label>All Select</label>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <>
              <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={5000}
              />
            </>
          ) : error ? (
            <>
              <Message message={error} clearError={clearError} />
            </>
          ) : msg ? (
            <>
              <Message success={msg} clearMsg={clearMsg} />
            </>
          ) : (
            <>
              {expenses.map((el) => (
                <tr key={el._id}>
                  <td>
                    {" "}
                    <input
                      type="checkbox"
                      className="label-checkbox"
                      name={el._id}
                      checked={el?.isChecked || false}
                      onChange={handleChange}
                    />
                  </td>
                  <td>{el._id}</td>
                  <td>{el.title}</td>
                  <td>{el.expense}</td>
                  <td>{el.type}</td>
                  <td>{el.amount}</td>
                  <td>{el.date}</td>
                  <button
                    className="btn btn-primary"
                    style={{ color: "black" }}
                    onClick={() => updateHandler(el._id)}
                  >
                    update
                  </button>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseLog;
