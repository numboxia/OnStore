const express = require("express");
const router = express.Router();
const {
  loginPage,
  registerPage,
  loginUser,
  registerUser
} = require("../controllers/authController");

router.get("/login", loginPage);
router.get("/register", registerPage);
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
