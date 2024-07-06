const IncomeSchema = require("../models/IncomeModel.js");

exports.addIncome = async (req, res) => {
  //destructuring the data from the part we are requesting, i.e- body...so-
  const { title, amount, category, description, date } = req.body;
  console.log(req.body)
  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "Income Added" });
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ message: "Server error" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ CreatedAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Income Deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Server Error" });
    });
};
