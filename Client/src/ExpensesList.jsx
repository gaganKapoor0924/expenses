import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("https://expenses-api-six.vercel.app/api/")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month} - ${day}`;
  };

  const handleDelete = (id) => {
    axios
      .delete("https://expenses-api-six.vercel.app/api/deleteExpense/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/add" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenses) &&
              expenses?.map((exp) => {
                return (
                  <tr>
                    <td>{exp?.name}</td>
                    <td>{exp?.quantity}</td>
                    <td>{exp?.price}</td>
                    <td>{formatDate(exp?.date)}</td>
                    <td>
                      <Link
                        to={`/update/${exp?._id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn  btn-danger"
                        onClick={(e) => handleDelete(exp?._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>{exp.quantity * exp.price}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesList;
