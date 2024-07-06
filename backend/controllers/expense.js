const ExpenseSchema = require("../models/ExpenseModel.js");

exports.addExpense = async (req, res) => {
  //destructuring the data from the part we are requesting, i.e- body...so-
  const { title, amount, category, description, date } = req.body;
  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  }); // creating an instance of the inputs which we have provided in the IncomeModel.js
  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount should be in positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.error("Error fetching expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ CreatedAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  console.log({id})
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Expense Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" });
    });
};
