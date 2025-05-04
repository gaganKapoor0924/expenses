const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExpensesModel = require('./models/expensesList');

const app = express();
app.use(cors({
  origin: 'https://expenses-frontend-smoky.vercel.app/',  // frontend origin
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json())


mongoose.connect('mongodb+srv://gagankapoor092485:gagan241985@cluster0.omt0ojj.mongodb.net/expenses?retryWrites=true&w=majority')

app.get("/",(req,res)=>{
  ExpensesModel.find()
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})

app.get("/getExpense/:id", (req, res)=>{
  const id = req.params.id;
  ExpensesModel.findById({_id:id})
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})
app.put("/updateExpense/:id", (req, res)=>{
  const id=req.params.id;
  ExpensesModel.findByIdAndUpdate({_id:id},{name:req.body.name, quantity:req.body.quantity, price:req.body.price, date:req.body.date})
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})
app.post("/addExpense", (req, res)=>{
  ExpensesModel.create(req.body)
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})

app.delete("/deleteExpense/:id",(req, res)=>{
  const id = req.params.id;
  ExpensesModel.findByIdAndDelete({_id:id})
  .then(expenses => res.json(expenses))
  .catch(err=> res.json(err))
})

app.listen(3001, () =>{
  console.log("Server is running");
})