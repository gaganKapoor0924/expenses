import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ExpensesList from "./ExpensesList";
import AddExpenses from "./AddExpenses";
import UpdateExpenses from "./UpdateExpenses";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ExpensesList />}></Route>
          <Route path="/add" element={<AddExpenses />}></Route>
          <Route path="/update/:id" element={<UpdateExpenses />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
