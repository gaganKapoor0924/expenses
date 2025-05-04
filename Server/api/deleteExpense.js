import dbConnect from '../utils/db';
import ExpensesModel from '../models/expensesList';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      const deleted = await ExpensesModel.findByIdAndDelete(id);
      res.status(200).json(deleted);
    } catch (err) {
      res.status(500).json({ error: 'Error deleting expense' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
