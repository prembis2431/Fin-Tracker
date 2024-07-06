const signup = require("../controllers/signup");
const login = require("../controllers/login");

const router = require("express").Router();


router.post("/signup", signup).post("/login", login);

module.exports = router;
