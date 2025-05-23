import dbConnect from '../utils/db';
import ExpensesModel from '../models/expensesList';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const expenses = await ExpensesModel.find();
      res.status(200).json(expenses);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching expenses' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
