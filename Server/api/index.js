const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExpensesModel = require('./models/expensesList');

const app = express();
const corsOptions = {
  origin: 'https://expenses-frontend-smoky.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
app.use(express.json())


mongoose.connect('mongodb+srv://gagankapoor092485:gagan241985@cluster0.omt0ojj.mongodb.net/expenses?retryWrites=true&w=majority')

app.get("/api/",(req,res)=>{
  ExpensesModel.find()
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})

app.get("/api/getExpense/:id", (req, res)=>{
  const id = req.params.id;
  ExpensesModel.findById({_id:id})
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})
app.put("/api/updateExpense/:id", (req, res)=>{
  const id=req.params.id;
  ExpensesModel.findByIdAndUpdate({_id:id},{name:req.body.name, quantity:req.body.quantity, price:req.body.price, date:req.body.date})
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})
app.post("/api/addExpense", (req, res)=>{
  ExpensesModel.create(req.body)
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})

app.delete("/api/deleteExpense/:id",(req, res)=>{
  const id = req.params.id;
  ExpensesModel.findByIdAndDelete({_id:id})
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})


module.exports = app;