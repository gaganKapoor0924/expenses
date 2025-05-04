const mongoose = require('mongoose');

const ExpensesSchema = new mongoose.Schema({
  name:String,
  quantity:Number,
  price:Number,
  date:String,

})

const ExpensesModel = mongoose.model("expensesList",ExpensesSchema);
module.exports = ExpensesModel;