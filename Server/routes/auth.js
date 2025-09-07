const express = require("express");
const router = express.Router();
const {
  loginPage,
  registerPage,
  loginUser,
  registerUser,
  connectWallet
} = require("../controllers/authController");

router.get("/login", loginPage);
router.get("/register", registerPage);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/connect-wallet", connectWallet);

module.exports = router;
