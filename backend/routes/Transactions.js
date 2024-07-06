const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");

const router = require("express").Router();

router
  .post("/add-income", addIncome)
  // addIncome is a controller function, coming from the controllers.
  // sets up a POST endpoint at /add-income in your Express router.
  // This means that when a POST request is made to the /add-income endpoint,
  // the addIncome function from your controllers will handle the request.
  .get("/get-incomes", getIncomes)
  .delete("/delete-income/:id", deleteIncome)
  .post("/add-expense", addExpense)
  .get("/get-expenses", getExpense)
  .delete("/delete-expense/:id", deleteExpense);

module.exports = router;
