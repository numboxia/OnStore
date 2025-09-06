const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("auth", { title: "Login", mode: "login" });
});

router.get("/register", (req, res) => {
  res.render("auth", { title: "Register", mode: "register" });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.send(`Login attempt for ${username}`);
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.send(`Register attempt for ${username}`);
});

module.exports = router;
