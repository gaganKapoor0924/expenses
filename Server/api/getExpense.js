import dbConnect from '../utils/db';
import ExpensesModel from '../models/expensesList';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { id } = req.query;
    try {
      const expense = await ExpensesModel.findById(id);
      res.status(200).json(expense);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching expense' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
