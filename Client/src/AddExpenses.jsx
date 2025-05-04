import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddExpenses = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(66);
  const [date, setDate] = useState("03-05-2025");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://expenses-api-six.vercel.app/addExpense", {
        name,
        quantity,
        price,
        date,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
    setName("");
    setQuantity(0);
    setDate("");
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2> Add Expense</h2>
          <div className="mb-2">
            <label>Expense Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter Expense Name"
              className="form-control"
              onChange={(e) => setName(e?.target?.value)}
            />
          </div>
          <div className="mb-2">
            <label>Quantity</label>
            <input
              type="text"
              value={quantity}
              placeholder="Enter Quantity"
              className="form-control"
              onChange={(e) => setQuantity(e?.target?.value)}
            />
          </div>
          <div className="mb-2">
            <label>Price</label>
            <input
              type="text"
              value={price}
              disabled
              placeholder="Enter Quantity"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label>Date</label>
            <input
              type="date"
              value={date}
              placeholder="Choose Date"
              className="form-control"
              onChange={(e) => setDate(e?.target?.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenses;
