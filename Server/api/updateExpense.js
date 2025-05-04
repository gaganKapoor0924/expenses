import dbConnect from '../utils/db';
import ExpensesModel from '../models/expensesList';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const expense = await ExpensesModel.create(req.body);
      res.status(201).json(expense);
    } catch (err) {
      res.status(500).json({ error: 'Error adding expense' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
