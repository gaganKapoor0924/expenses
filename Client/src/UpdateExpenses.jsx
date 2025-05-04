import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateExpenses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    axios
      .get(`https://expenses-api-six.vercel.app/getExpense/` + id)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setQuantity(res.data.quantity);
        setPrice(res.data.price);
        setDate(res.data.date);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("https://expenses-api-six.vercel.app/updateExpense/" + id, {
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
          <h2> Update Expense</h2>
          <div className="mb-2">
            <label>Expense Name</label>
            <input
              type="text"
              value={name}
              placeholder="Enter Expense Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Quantity</label>
            <input
              type="text"
              value={quantity}
              placeholder="Enter Quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Price</label>
            <input
              type="text"
              value={price}
              placeholder="Enter Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label>Date</label>
            <input
              type="date"
              value={date}
              placeholder="Choose Date"
              className="form-control"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpenses;
